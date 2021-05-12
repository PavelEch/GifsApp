import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsReponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private _apiKey: string = "HhxwbidX2SKUMQzyAgMUgaaYI7mxtYRU";
  private _servicioUrl: string = "https://api.giphy.com/v1/gifs";

  //TODO: Cambiar any por el tipo correcto
  public resultados: Gif[] = [];

  //operador spread en arreglo, regresa un nuevo arreglo y no la referencia
  get historial() {
    //Retorna las PRIMERAS 10 cosas del arreglo (sigue insertando);
    //this._historial = this._historial.splice(0, 10);
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //this._historial = localStorage.getItem('historial');

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    console.log(this._historial);

    if (localStorage.getItem('resultadosGifs')) {
      this.resultados = JSON.parse(localStorage.getItem('resultadosGifs')!);

      console.log(this.resultados);
    }

    //Opcional en una línea:
    //this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscarGifs(query: string = "") {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      //Agrega al principio del arreglo el valor
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      console.log(this._historial)

      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log(params.toString());

    //Asigna el historial local a los primeros 10 valores del historial (el 11vo se pierde)

    //Angular ya posee una herramienta para realizar peticiones http.


    //Utilizamos la prestación httpClient para utilizar el método this.http.get
    //Suscribe es similar a then y se ejecuta cuando obtengamos la respuesta de 
    //el enlace get.

    //Aunque puede marcar un error en resp.data es debido a que Typescript
    //no puede reconocer el tipo de información que será obtenida en la petición http
    //Se debe especificar en { resp } el tipo de dato que será obtenido
    this.http.get<SearchGifsReponse>
      (`${this._servicioUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultadosGifs', JSON.stringify(this.resultados));
      });


  }

}

import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public lista: string[] = [];

  constructor(private gifsService: GifsService) { }

  get historial() {
    return this.gifsService.historial;
  }

  buscar(termino: string): void {
    console.log(termino);

    this.gifsService.buscarGifs(termino);
  }

}

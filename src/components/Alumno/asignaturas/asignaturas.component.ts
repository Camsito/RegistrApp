import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.scss'],
})
export class AsignaturasComponent  implements OnInit {
  username: string | null = null;
  asignaturaSeleccionada: string = '';
  qrCodeURL: string = '';

  constructor(
  ) { }

  ngOnInit() {
  }

}

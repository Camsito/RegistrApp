import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
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
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.username = this.sharedService.getUsername();
  }

}

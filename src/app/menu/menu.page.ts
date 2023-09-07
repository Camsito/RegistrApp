import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SharedService } from '../../services/shared.service';

interface MenuItem {
  label: string;
  icon: string;
  destination: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})

// Declaraciones para las opciones del menu //
export class MenuPage implements OnInit {
  username: string | null = null;
  title: string | null = null;
  
  menuItems: MenuItem[] = [
    { label: 'Inicio', icon: 'Home', destination: 'menu' },
    { label: 'Cuenta', icon: 'person', destination: 'cuenta' },
    { label: 'Perfil', icon: 'person-circle', destination: 'perfil' },
    { label: 'Asignaturas', icon: 'book', destination: 'asignaturas' },
    { label: 'Cerrar Sesión', icon: 'exit', destination: 'Cerrar Sesion' }
  ];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private menuController: MenuController
  ) {}

  //Obtencion de Nombre de usuario para mostrar en el mensaje de bienvenida //
  ngOnInit() {
    this.username = this.sharedService.getUsername();
    this.title = this.sharedService.getTitlePage();
  }

  //Manejo de direcciones a traves de irA //
  irA(destino: string) {
    if (destino === 'cuenta' || destino === 'perfil' || destino === 'asignaturas') {
      this.router.navigate([`/menu/${destino}`]);
  } if( destino === 'menu') {
      this.router.navigate([`/menu`]);
    }
  }

  // Funcion para cerrar el menu //
  cerrarMenu() {
    this.menuController.close();
  }
}

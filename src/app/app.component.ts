import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { retry } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private platform: Platform,
    public toastController: ToastController,
    private sqlite: SQLite
  ) {
    this.initializeApp();
  }
  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.createDatabase();
    });
    this.agregarCredencial('Cam', '12345');
    this.agregarCredencial('Diego', '12345');
    retry(2);
  }

  createDatabase() {
    this.sqlite.create({
      name: 'usuarios.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      // Crea la tabla de credenciales si no existe
      db.executeSql(`
        CREATE TABLE IF NOT EXISTS credenciales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT,
          contrasena TEXT
        )`, [])
        .then(() => console.log('Tabla de credenciales creada'))
        .catch(error => console.error('Error al crear la tabla de credenciales', error));
    })
    .catch(error => console.error('Error al abrir la base de datos SQLite', error));
  }
  agregarCredencial(usuario: string, contrasena: string) {
    this.sqlite.create({
      name: 'usuarios.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO credenciales (usuario, contrasena) VALUES (?, ?)', [usuario, contrasena])
        .then(() => {
          console.log('Credencial agregada con éxito.');
        })
        .catch(error => console.error('Error al agregar la credencial', error));
    })
    .catch(error => console.error('Error al abrir la base de datos SQLite', error));
  }
}

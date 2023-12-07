import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home.page';
import { SharedService } from '../../services/shared.service';
import { ServiceGuardService } from '../../services/loginGuard/service-guard.service';
import { MensajeService } from 'src/services/mensajeService/mensaje.service';
import { SQLiteService } from '../../services/SQLiteService/sqlite.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        SharedService,
        ServiceGuardService,
        MensajeService,
        SQLiteService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isMobile to true on mobile platform', () => {
    spyOn(component.platform, 'is').and.returnValue(true);
    component.ngOnInit();
    expect(component.isMobile).toBe(true);
  });

  it('should call navigateToForgot method and navigate to /forgot-password', () => {
    const navigateSpy = spyOn(component.router, 'navigate');
    component.navigateToForgot();
    expect(navigateSpy).toHaveBeenCalledWith(['/forgot-password']);
  });

  // You can continue adding more test cases for other methods in your component

  // Example of testing asynchronous method (validarYLogin)
  it('should show error message for empty fields', async(() => {
    const mensajeServiceSpy = spyOn(component.mensajeService, 'mostrarMensaje');
    component.validarYLogin();
    fixture.whenStable().then(() => {
      expect(mensajeServiceSpy).toHaveBeenCalledWith('Los campos no pueden estar vacíos.');
    });
  }));
});

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes'; // Importa el módulo de enrutamiento
import { LoginComponent } from './login/login.component';
import { InitComponent } from './pages/init/init.component';
import { AuthService } from './auth.service';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    LoginComponent,
    InitComponent // Asegúrate de que AppRoutingModule esté aquí
  ],
  providers: [AuthService],
})
export class AppModule { }

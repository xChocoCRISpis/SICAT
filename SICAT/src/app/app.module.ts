import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes"; // Importa el módulo de enrutamiento
import { LoginComponent } from "./login/login.component";
import { InitComponent } from "./pages/init/init.component";
import { AuthService } from "./auth.service";
import { HttpClientModule } from "@angular/common/http";
import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  declarations: [AppComponent, LoginComponent, InitComponent],
  providers: [
    AuthService,
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
})
export class AppModule {}

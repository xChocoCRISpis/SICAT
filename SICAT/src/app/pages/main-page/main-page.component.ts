import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { InitComponent } from "../init/init.component";
import { Router } from '@angular/router';
import { ActividadesComponent } from "../../components/actividades/actividades.component";
import {NavBarService} from "../../services/nav-bar.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NavBarComponent, InitComponent, ActividadesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  public page : string = 'init';
  
  
  constructor(
    private router: Router,
    private pages:NavBarService
  ){
    this.pages.pageEmitter.subscribe((value)=>{
      this.page = value.toString();
    });
  }

  public notFound(){
    this.router.navigate(["404-not-found"]);
  }
}

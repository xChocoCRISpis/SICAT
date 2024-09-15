import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService,Pages } from '../../services/nav-bar.service'


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isMenuOpened = false;

  constructor(private router: Router,
    private pages:NavBarService
  ){}
  toggleMenu(): void {
    const menuSide = document.getElementById('menu_side');
    this.isMenuOpened = !this.isMenuOpened;
    if (menuSide) {
      menuSide.classList.toggle('active');
    }
  }

  /* navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  } */

  toggleSubmenu(id: string): void {
    const submenu = document.getElementById(id);
    if (submenu) {
      if (submenu.classList.contains('active')) {
        submenu.classList.remove('active');
      } else {
        document.querySelectorAll('.submenu.active').forEach(el => {
          el.classList.remove('active');
        });
        submenu.classList.add('active');
      }
    }
  }

  logout():void{
    localStorage.clear();
    this.router.navigate([""]);
  }

  changePage(page:Pages){
    this.pages.loadComponent(page);
  }
}

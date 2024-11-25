import { Component } from '@angular/core';
import { NavBarService, Pages } from '../../services/nav-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar-profesor',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar-profesor.component.html',
  styleUrl: './nav-bar-profesor.component.scss'
})
export class NavBarProfesorComponent {
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

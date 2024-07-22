import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(private router: Router){}
  toggleMenu(): void {
    const menuSide = document.getElementById('menu_side');
    const contentWrapper = document.getElementById('content-wrapper');
    if (menuSide) menuSide.classList.toggle('active');
    if (contentWrapper) contentWrapper.classList.toggle('shifted');
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
    this.router.navigate([""]);
  }

}

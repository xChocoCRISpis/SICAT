import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService,Pages } from '../../services/nav-bar.service'
import { MessengerStatesService } from '../../services/messenger-states.service';
import { UpNavBarComponent } from '../../components/up-nav-bar/up-nav-bar.component';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [UpNavBarComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isMenuOpened = false;
 

  constructor(
    private router: Router,
    private pages: NavBarService,
    private messengerStatesService: MessengerStatesService
  ) {
   
  }
  ngOnInit(): void {
    this.messengerStatesService.menuState$.subscribe((state: boolean) => {
      this.isMenuOpened = state;
      const menuSide = document.getElementById('menu_side');
      if (menuSide) {
        menuSide.classList.toggle('active', state);
      }
    });
  }

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

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    const menuSide = document.getElementById('menu_side');
    if (menuSide) {
      menuSide.classList.toggle('active');
    }
    this.messengerStatesService.setMenuState(this.isMenuOpened);
  }
}

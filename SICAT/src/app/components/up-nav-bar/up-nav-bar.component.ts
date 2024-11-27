import { Component } from '@angular/core';
import { MessengerStatesService } from '../../services/messenger-states.service';
import { ContentNavBarComponent } from '../content-nav-bar/content-nav-bar.component';
@Component({
  selector: 'up-nav-bar',
  standalone: true,
  imports: [ContentNavBarComponent],
  templateUrl: './up-nav-bar.component.html',
  styleUrl: './up-nav-bar.component.scss',
})
export class UpNavBarComponent {
  isMenuOpened = false;

  constructor(private messengerStatesService: MessengerStatesService) {
    // Suscribirse al estado del menú
    this.messengerStatesService.menuState$.subscribe(
      state => this.isMenuOpened = state
    );
  }

  toggleMenuState(): void {
    this.messengerStatesService.setMenuState(!this.isMenuOpened);
  }
}

import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { InitComponent } from './pages/init/init.component';
import { LoginComponent } from "./login/login.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InitComponent, RouterLink, LoginComponent, RouterModule, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SICAT';

}

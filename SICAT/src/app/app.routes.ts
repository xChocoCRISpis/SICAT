import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InitComponent } from './pages/init/init.component';
import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sicat', component: MainPageComponent,canActivate:[AuthGuard]},
  {path: 'change-password', component:ChangePasswordComponent},
  { path: '404-not-found', component: NotFoundComponent},
  { path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
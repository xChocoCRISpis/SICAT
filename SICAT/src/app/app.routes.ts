import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InitComponent } from './pages/init/init.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sicat', component: InitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
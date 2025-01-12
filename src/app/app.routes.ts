import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MaterialsComponent } from './materials/materials.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'materials', component: MaterialsComponent, canActivate: [AuthGuard] },
];

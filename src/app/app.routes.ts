import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'auth', loadComponent: () => import('./auth/login/login.component').then((c) => c.LoginComponent) },
  { path: 'materials', loadComponent: () => import('./materials/materials.component').then((c) => c.MaterialsComponent) },
  { path: 'locations', loadComponent: () => import('./locations/locations.component').then((c) => c.LocationsComponent) },
  { path: '**', redirectTo: 'auth' },
];

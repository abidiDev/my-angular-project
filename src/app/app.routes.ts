import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'demo/theme', loadComponent: () => import('./features/theme-demo/theme-demo.component').then(m => m.ThemeDemoComponent) },
    { path: '**', redirectTo: 'demo/theme' }
  ];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/pins/pins.component').then((c) => c.PinsComponent),
  },
];

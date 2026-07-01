import { Routes } from '@angular/router';
import { GestionAutosComponent } from './components/gestion-autos-component/gestion-autos-component';
import { CatalogosAutosComponent } from './components/catalogos-autos-component/catalogos-autos-component';

export const routes: Routes = [
  { path: 'gestionAutos', component: GestionAutosComponent },
  { path: "catalogoAutos", component: CatalogosAutosComponent }
];

import { Routes } from '@angular/router';
import { GestionAutosComponent } from './components/gestion-autos-component/gestion-autos-component';
import { CatalogosAutosComponent } from './components/catalogos-autos-component/catalogos-autos-component';
import { VentaComponent } from './components/venta-component/venta-component';
import { HomeComponent } from './components/home-component/home-component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gestionAutos', component: GestionAutosComponent },
  { path: "catalogoAutos", component: CatalogosAutosComponent },
  { path: "venta", component: VentaComponent}
];

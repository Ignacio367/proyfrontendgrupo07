import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Auto {
  id: number;
  marca: string;
  modelo: string;
  anio: number;
  version: string;
  kilometraje: number;
  combustible: 'nafta' | 'diesel' | 'hibrido' | 'electrico';
  transmision: 'manual' | 'automatica';
  color: string;
  precio: number;
  descuento: number,
  descripcion: string;
  estado: 'disponible' | 'reservado' | 'vendido';
  imagenes: string[];
}

@Injectable({
  providedIn: 'root',
})

export class AutosService {
  // MOCK DATA (simula backend)
  private autos: Auto[] = [
    {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2022,
      version: 'XEI',
      kilometraje: 25000,
      combustible: 'nafta',
      transmision: 'automatica',
      color: 'blanco',
      precio: 18000,
      descuento: 0,
      descripcion: 'Sedán cómodo y confiable',
      estado: 'disponible',
      imagenes: ['assets/autos/corolla.jpg']
    },
    {
      id: 2,
      marca: 'Volkswagen',
      modelo: 'Golf',
      anio: 2021,
      version: 'TSI',
      kilometraje: 30000,
      combustible: 'nafta',
      transmision: 'manual',
      color: 'gris',
      precio: 17000,
      descuento: 40,
      descripcion: 'Compacto deportivo',
      estado: 'reservado',
      imagenes: ['assets/autos/golf.jpg']
    },
    {
      id: 3,
      marca: 'Ford',
      modelo: 'Focus',
      anio: 2020,
      version: 'SE',
      kilometraje: 40000,
      combustible: 'nafta',
      transmision: 'manual',
      color: 'negro',
      precio: 15000,
      descuento: 10,
      descripcion: 'Económico y eficiente',
      estado: 'vendido',
      imagenes: ['assets/autos/focus.jpg']
    }
  ];

  // stream reactivo (preparado para backend)
  private autosSubject = new BehaviorSubject<Auto[]>(this.autos);


  // Obtener todos los autos
  getAutos(): Observable<Auto[]> {
    return this.autosSubject.asObservable();
  }

  // Obtener auto por ID
  getAutoById(id: number): Auto | undefined {
    return this.autos.find(a => a.id === id);
  }

  // Añade un auto
  addAuto(auto: Auto): void {
    this.autos.push(auto);
    this.autosSubject.next(this.autos);
  }

  // Actualizar un auto
  updateAuto(updated: Auto): void {
    const index = this.autos.findIndex(a => a.id === updated.id);
    if(index !== -1){ // existe
      this.autos[index] = updated;
      this.autosSubject.next(this.autos);
    }
  }

  // Eliminar un auto por ID
  deleteAuto(id: number): void {
    this.autos = this.autos.filter(a => a.id !== id);
    this.autosSubject.next(this.autos);
  }
}

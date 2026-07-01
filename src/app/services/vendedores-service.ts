import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Vendedor {
  vendedorId: number;

  nombre: string;
  apellido: string;

  dni: string;

  email: string;
  telefono: string;

  fechaIngreso: string;

  observaciones?: string;
}

@Injectable({
  providedIn: 'root',
})

export class VendedoresService {

  vendedores: Vendedor[] = [
    {
      vendedorId: 1,
      nombre: 'Carlos',
      apellido: 'Martínez',
      dni: '32123456',
      email: 'carlos.martinez@concesionaria.com',
      telefono: '3884112233',
      fechaIngreso: '2024-01-15'
    },
    {
      vendedorId: 2,
      nombre: 'Lucía',
      apellido: 'Fernández',
      dni: '35444555',
      email: 'lucia.fernandez@concesionaria.com',
      telefono: '3884223344',
      fechaIngreso: '2023-08-10',
      observaciones: 'Especialista en ventas financiadas.'
    },
    {
      vendedorId: 3,
      nombre: 'Matías',
      apellido: 'Gómez',
      dni: '29888777',
      email: 'matias.gomez@concesionaria.com',
      telefono: '3884334455',
      fechaIngreso: '2025-03-20'
    }
  ];

  private vendedoresSubject = new BehaviorSubject<Vendedor[]>(this.vendedores);

  // Obtener todos los vendedores
  getVendedores(): Observable<Vendedor[]> {
    return this.vendedoresSubject.asObservable();
  }

  // Obtener un vendedor por ID
  getVendedorById(id: number): Vendedor | undefined {
    return this.vendedores.find(v => v.vendedorId === id);
  }

  // Agregar un vendedor
  addVendedor(vendedor: Vendedor): void {
    this.vendedores.push(vendedor);
    this.vendedoresSubject.next(this.vendedores);
  }

  // Actualizar un vendedor
  updateVendedor(updated: Vendedor): void {

    if (updated.vendedorId == null) return;

    const index = this.vendedores.findIndex(
      v => v.vendedorId === updated.vendedorId
    );

    if (index !== -1) {
      this.vendedores[index] = updated;
      this.vendedoresSubject.next(this.vendedores);
    }
  }

  // Eliminar un vendedor
  deleteVendedor(id: number): void {
    this.vendedores = this.vendedores.filter(
      v => v.vendedorId !== id
    );

    this.vendedoresSubject.next(this.vendedores);
  }
}

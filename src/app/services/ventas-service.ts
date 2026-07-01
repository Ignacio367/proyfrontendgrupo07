import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Venta {
  ventaId?: number;

  clienteId: number;
  autoId: number;
  vendedorId: number;

  metodoPago: 'efectivo' | 'transferencia' | 'tarjeta' | 'financiado';

  cuotas?: number;
  descuento?: number;

  observaciones?: string;

  fechaVenta?: string;
  precioFinal?: number;
}

@Injectable({
  providedIn: 'root',
})


export class VentasService {

  ventas: Venta[] = [
    {
      ventaId: 1,
      clienteId: 1,
      autoId: 1,
      vendedorId: 1,
      metodoPago: 'transferencia',
      observaciones: 'Entrega inmediata.',
      fechaVenta: '2026-07-01',
      precioFinal: 24500000
    },
    {
      ventaId: 2,
      clienteId: 3,
      autoId: 2,
      vendedorId: 2,
      metodoPago: 'financiado',
      cuotas: 24,
      descuento: 500000,
      observaciones: 'Financiación bancaria.',
      fechaVenta: '2026-07-03',
      precioFinal: 31800000
    },
    {
      ventaId: 3,
      clienteId: 2,
      autoId: 3,
      vendedorId: 1,
      metodoPago: 'efectivo',
      descuento: 250000,
      fechaVenta: '2026-07-05',
      precioFinal: 18750000
    }
  ];

  private ventasSubject = new BehaviorSubject<Venta[]>(this.ventas);

  // Obtener todos los autos
  getVentas(): Observable<Venta[]> {
    return this.ventasSubject.asObservable();
  }

  // Obtener una venta por ID
  getVentaById(id: number): Venta | undefined {
    return this.ventas.find(v => v.ventaId === id);
  }

  // Añade una venta
  addVenta(venta: Venta): void {
    this.ventas.push(venta);
    this.ventasSubject.next(this.ventas);
  }

  // Actualizar una venta
  updateVenta(updated: Venta): void {
    const index = this.ventas.findIndex(a => a.ventaId === updated.ventaId);
    if(index !== -1){ // existe
      this.ventas[index] = updated;
      this.ventasSubject.next(this.ventas);
    }
  }

  // Eliminar una venta por ID
  deleteVenta(id: number): void {
    this.ventas = this.ventas.filter(a => a.ventaId !== id);
    this.ventasSubject.next(this.ventas);
  }
}

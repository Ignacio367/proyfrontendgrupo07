import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Venta, VentasService } from '../../services/ventas-service';

@Component({
  selector: 'app-venta-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './venta-component.html',
  styleUrl: './venta-component.css',
})
export class VentaComponent {

  constructor(private ventaService: VentasService) {}


  // Datos simulados (luego vienen del backend)
  clientes: any[] = [];
  autos: any[] = [];
  vendedores: any[] = [];

  ventaForm = new FormGroup({
    clienteId: new FormControl<number | null>(null),
    autoId: new FormControl<number | null>(null),
    vendedorId: new FormControl<number | null>(null),

    metodoPago: new FormControl<'efectivo' | 'transferencia' | 'tarjeta' | 'financiado'>('efectivo'),

    cuotas: new FormControl<number | null>(null),
    descuento: new FormControl<number | null>(null),
    observaciones: new FormControl(''),
  });

  crearVenta() {
    const venta = this.ventaForm.value;

    console.log('VENTA:', venta);

    // acá después llamás al backend
  }


  // CONFIRMACINO VENTAS
  confirmarVenta() {
    const venta = this.ventaForm.getRawValue() as Venta;

    this.ventaService.addVenta(venta);
  }
}

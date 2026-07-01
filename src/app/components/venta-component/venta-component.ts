import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Venta, VentasService } from '../../services/ventas-service';
import { Cliente, ClientesService } from '../../services/clientes-service';
import { Auto, AutosService } from '../../services/autos-service';
import { Vendedor, VendedoresService } from '../../services/vendedores-service';

@Component({
  selector: 'app-venta-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './venta-component.html',
  styleUrl: './venta-component.css',
})
export class VentaComponent {
  constructor(
    private ventaService: VentasService,
    private clientesService: ClientesService,
    private autosService: AutosService,
    private vendedoresService: VendedoresService
  ) {}

  clientes: Cliente[] = [];
  autos: Auto[] = [];
  vendedores: Vendedor[] = [];

  ventaCreada: Venta | null = null;

  ventaForm = new FormGroup({
    clienteId: new FormControl<number | null>(null, Validators.required),
    autoId: new FormControl<number | null>(null, Validators.required),
    vendedorId: new FormControl<number | null>(null, Validators.required),

    metodoPago: new FormControl<
      'efectivo' | 'transferencia' | 'tarjeta' | 'financiado'
    >('efectivo', Validators.required),

    cuotas: new FormControl<number | null>({
      value: null,
      disabled: true
    }),
    descuento: new FormControl<number | null>(
      null,
      [Validators.min(0), Validators.max(100)]
    ),
    observaciones: new FormControl(''),
  });

  ngOnInit(): void {

    this.clientesService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.autosService.getAutos().subscribe(autos => {
      // Solo mostrar autos disponibles
      this.autos = autos.filter(auto => auto.estado === 'disponible' && auto.visible === true);
    });

    this.vendedoresService.getVendedores().subscribe(vendedores => {
      this.vendedores = vendedores;
    });



    // SOLO PERMITE CUOTAS EN TRANSFERENCIA O FINANCIADO
    this.ventaForm.get('metodoPago')?.valueChanges.subscribe(metodo => {

      const cuotasControl = this.ventaForm.get('cuotas');

      if(!cuotasControl) return;

      if(metodo === 'tarjeta' || metodo === 'financiado'){
        cuotasControl.enable();
      }else{
        cuotasControl.setValue(null);
        cuotasControl.disable();
      }

    });

    // ACTUALIZA EL DESCUENTO
    this.ventaForm.get('autoId')?.valueChanges.subscribe(autoId => {
      if (!autoId) return;

      const auto = this.autos.find(a => a.id === autoId);

      if(!auto) return;

      this.ventaForm.patchValue({
        descuento: auto.descuento ?? 0
      });
    });
  }

  // GETTERS

  get clienteSeleccionado(): Cliente | undefined {
    return this.clientes.find(
      cliente => cliente.clienteId === this.ventaForm.value.clienteId
    );
  }

  get autoSeleccionado(): Auto | undefined {
    return this.autos.find(
      auto => auto.id === this.ventaForm.value.autoId
    );
  }

  get vendedorSeleccionado(): Vendedor | undefined {
    return this.vendedores.find(
      vendedor => vendedor.vendedorId === this.ventaForm.value.vendedorId
    );
  }

  // CALCULO DESCUENTO
  get precioFinal(): number {

    if(!this.autoSeleccionado) return 0;

    const descuento = this.ventaForm.value.descuento ?? 0;

    return this.autoSeleccionado.precio - (this.autoSeleccionado.precio * descuento / 100);
  }

  get tieneDescuento(): boolean {
    return (this.ventaForm.value.descuento ?? 0) > 0;
  }

  // CONFIRMACION VENTA

  confirmarVenta(): void {

    if(this.ventaForm.invalid) return;

    const venta: Venta = {
      ...this.ventaForm.getRawValue(),

      ventaId: Date.now(), // Temporal hasta tener backend

      fechaVenta: new Date().toISOString(),

      precioFinal: this.precioFinal

    } as Venta;

    this.ventaService.addVenta(venta);

    console.log(venta)
    this.ventaCreada = venta;

    this.ventaForm.reset({
      clienteId: null,
      autoId: null,
      vendedorId: null,
      metodoPago: 'efectivo',
      cuotas: null,
      descuento: null,
      observaciones: ''
    });
  }
}

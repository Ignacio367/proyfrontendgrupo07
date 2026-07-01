import { ChangeDetectorRef, Component } from '@angular/core';
import { Auto, AutosService } from '../../services/autos-service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogos-autos-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalogos-autos-component.html',
  styleUrl: './catalogos-autos-component.css',
})


export class CatalogosAutosComponent {

  constructor(private autosService: AutosService,
              private changeDetectorRef: ChangeDetectorRef
  ) {}

  autoSeleccionado: Auto | null = null;
  seleccionarAuto(autoSeleccionado: Auto) {
    this.autoSeleccionado = autoSeleccionado;
  }

  autosList: Auto[] = [];

  // FILTRO
  filteredAutosList: Auto[] = [];

  filtrosForm = new FormGroup({
    texto: new FormControl(''),
    marca: new FormControl(''),
    anio: new FormControl(''),
    estado: new FormControl('disponible'), // SOLO AUTOS DISPONIBLES!
    precioMinimo: new FormControl(null),
    precioMaximo: new FormControl(null),
  });

  // calculo del precio final mediante el descuento
  calcularPrecioFinal(auto: Auto): number {
    return auto.precio - (auto.precio * (auto.descuento ?? 0) / 100);
  }

  ngOnInit(): void {
    this.autosService.getAutos().subscribe(data => {
      this.autosList = data;

      // SOLO AUTOS DISPONIBLES
      this.filteredAutosList = this.autosList.filter(auto => auto.estado == "disponible"); 

      this.changeDetectorRef.detectChanges();
    });

  }

  getAutoById(id: number) {
    return this.autosService.getAutoById(id);
  }


  // FILTROS
  filtrarAutos(){
    const filtros = this.filtrosForm.value;

    const texto = (filtros.texto ?? '').toLowerCase();
    const marca = filtros.marca;
    const anio = filtros.anio;
    const estado = filtros.estado;

    const precioMinimo = filtros.precioMinimo;
    const precioMaximo = filtros.precioMaximo;

    this.filteredAutosList = this.autosList.filter(auto => {

      // TEXTO (marca o modelo)
      const coincideTexto =
        auto.marca.toLowerCase().includes(texto) ||
        auto.modelo.toLowerCase().includes(texto);

      // MARCA
      const coincideMarca =
        marca ? auto.marca === marca : true;

      // AÑO
      const coincideAnio =
        anio ? auto.anio == +anio : true;

      // ESTADO (el estado del form es DISPOINBLE, siempre va a estar disponible un auto)
      const coincideEstado =
        estado ? auto.estado === estado : true;

      // PRECIO (RANGO)
      const coincidePrecio =
        (precioMinimo != null ? auto.precio >= precioMinimo : true) &&
        (precioMaximo != null ? auto.precio <= precioMaximo : true);

      return (
        coincideTexto &&
        coincideMarca &&
        coincideAnio &&
        coincideEstado &&
        coincidePrecio
      );
    });
  }


  limpiarFiltros() {
    this.filtrosForm.reset({
      texto: '',
      marca: '',
      anio: '',
      estado: 'disponible',
      precioMinimo: null,
      precioMaximo: null
    });

    this.filteredAutosList = this.autosList.filter(a => a.estado === "disponible");
  }
}

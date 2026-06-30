import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Auto, AutosService } from '../../services/autos-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autos-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autos-component.html',
  styleUrl: './autos-component.css',
})

export class AutosComponent {
  constructor(private autosService: AutosService,
              private changeDetectorRef: ChangeDetectorRef
  ) {}

  autosList: Auto[] = [];

  // filtro
  filteredAutosList: Auto[] = [];

  filtrosForm = new FormGroup({
    texto: new FormControl(''),
    marca: new FormControl(''),
    anio: new FormControl(''),
    estado: new FormControl('')
  });


  ngOnInit(): void {
    this.autosService.getAutos().subscribe(data => {
      this.autosList = data;
      this.filteredAutosList = data;

      this.changeDetectorRef.detectChanges();
    });
  }

  getAutoById(id: number) {
    return this.autosService.getAutoById(id);
  }

  
  // FILTROS
  filtrarAutos() {
    const filtros = this.filtrosForm.value;

    this.filteredAutosList = this.autosList.filter(auto => {

      const coincideTexto =
        auto.marca.toLowerCase().includes((filtros.texto ?? '').toLowerCase()) ||
        auto.modelo.toLowerCase().includes((filtros.texto ?? '').toLowerCase());

      const coincideMarca =
        filtros.marca ? auto.marca === filtros.marca : true;

      const coincideAnio =
        filtros.anio ? auto.anio == +filtros.anio : true;

      const coincideEstado =
        filtros.estado ? auto.estado === filtros.estado : true;

      return coincideTexto && coincideMarca && coincideAnio && coincideEstado;
    });
  }
  limpiarFiltros() {
    this.filtrosForm.reset();
    this.filteredAutosList = this.autosList;
  }
}

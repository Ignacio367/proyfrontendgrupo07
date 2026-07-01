import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Auto, AutosService } from '../../services/autos-service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    estado: new FormControl('')
  });

  // Nuevo auto FORM, El ID se crea directamente al guardar (USADO PARA EDITAR Y AÑADIR)
  formAuto = new FormGroup({
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    anio: new FormControl<number | null>(null, Validators.required),
    version: new FormControl('', Validators.required),
    kilometraje: new FormControl<number | null>(null, Validators.required),
    combustible: new FormControl('', Validators.required),
    transmision: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    precio: new FormControl<number | null>(null, Validators.required),
    descripcion: new FormControl('', Validators.required),
    imagenes: new FormArray([], Validators.required),
    estado: new FormControl('', Validators.required)
  });

  get imagenes() {
    return this.formAuto.get('imagenes') as FormArray;
  }
  agregarImagen() {
    this.imagenes.push(new FormControl('', Validators.required));
  }
  eliminarImagen(index: number) {
    this.imagenes.removeAt(index);
  }


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

  // EDITAR AUTO
  abrirEdicion(auto: Auto) {
    this.autoSeleccionado = auto;

    setTimeout(() => {
      this.formAuto.reset();

      this.formAuto.patchValue({
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        version: auto.version,
        kilometraje: auto.kilometraje,
        combustible: auto.combustible,
        transmision: auto.transmision,
        color: auto.color,
        precio: auto.precio,
        descripcion: auto.descripcion,
        estado: auto.estado
      });

      this.imagenes.clear();
      (auto.imagenes ?? []).forEach(img =>
        this.imagenes.push(new FormControl(img, Validators.required))
      );
    });
  }
  
  guardarEdicion() {
    if(!this.autoSeleccionado) return;

    if(this.formAuto.invalid){
      this.formAuto.markAllAsTouched();
      return;
    }

    const formValue = this.formAuto.value;

    const autoActualizado: Auto = {
      id: this.autoSeleccionado.id, // CLAVE: no cambia
      marca: formValue.marca!,
      modelo: formValue.modelo!,
      anio: formValue.anio!,
      version: formValue.version!,
      kilometraje: formValue.kilometraje!,
      combustible: formValue.combustible as Auto['combustible'],
      transmision: formValue.transmision as Auto['transmision'],
      color: formValue.color!,
      precio: formValue.precio!,
      descripcion: formValue.descripcion!,
      estado: formValue.estado as Auto['estado'],
      imagenes: (formValue.imagenes as string[]).filter(Boolean)
    };

    this.autosService.updateAuto(autoActualizado);

    this.autoSeleccionado = null;

    this.limpiarFormularioAuto();
  }


  
  // AÑADIR AUTO
  aniadirAuto() {
    if(this.formAuto.invalid){
      this.formAuto.markAllAsTouched();
      return;
    }

    const formValue = this.formAuto.value;

    const nuevoAuto: Auto = {
      id: Date.now(), // ID EN BASE A LA FECHA
      marca: formValue.marca!,
      modelo: formValue.modelo!,
      anio: formValue.anio!,
      version: formValue.version!,
      kilometraje: formValue.kilometraje!,
      combustible: formValue.combustible as Auto['combustible'],
      transmision: formValue.transmision as Auto['transmision'],
      color: formValue.color!,
      precio: formValue.precio!,
      descripcion: formValue.descripcion!,
      estado: formValue.estado as Auto['estado'],
      imagenes: formValue.imagenes || []
    };

    this.autosService.addAuto(nuevoAuto);

    this.limpiarFormularioAuto();
  }

  limpiarFormularioAuto() {
      this.formAuto.reset();

      this.imagenes.clear();

      // Si querés que al abrir de nuevo ya haya un input para una imagen:
      this.agregarImagen();
  }

  // ELIMINAR AUTO
  eliminarAuto() {
    if(!this.autoSeleccionado) return;
    this.autosService.deleteAuto(this.autoSeleccionado.id);
    this.autoSeleccionado = null;
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

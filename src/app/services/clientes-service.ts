import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cliente {
  clienteId?: number;

  nombre: string;
  apellido: string;

  dni: string;

  email: string;
  telefono: string;

  direccion: string;
  ciudad: string;
  provincia: string;

  fechaNacimiento?: string;

  observaciones?: string;
}


@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clientes: Cliente[] = [
    {
      clienteId: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '35123456',
      email: 'juan.perez@gmail.com',
      telefono: '3885123456',
      direccion: 'Av. Belgrano 123',
      ciudad: 'San Salvador de Jujuy',
      provincia: 'Jujuy'
    },
    {
      clienteId: 2,
      nombre: 'María',
      apellido: 'Gómez',
      dni: '40111222',
      email: 'maria.gomez@gmail.com',
      telefono: '3885456789',
      direccion: 'San Martín 456',
      ciudad: 'Palpalá',
      provincia: 'Jujuy',
      observaciones: 'Cliente frecuente.'
    },
    {
      clienteId: 3,
      nombre: 'Carlos',
      apellido: 'López',
      dni: '28999888',
      email: 'carlos.lopez@gmail.com',
      telefono: '3885987654',
      direccion: 'Mitre 890',
      ciudad: 'Perico',
      provincia: 'Jujuy'
    }
  ];

  private clientesSubject = new BehaviorSubject<Cliente[]>(this.clientes);

  // Obtener todos los clientes
  getClientes(): Observable<Cliente[]> {
    return this.clientesSubject.asObservable();
  }

  // Obtener un cliente por ID
  getClienteById(id: number): Cliente | undefined {
    return this.clientes.find(c => c.clienteId === id);
  }

  // Agregar cliente
  addCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
    this.clientesSubject.next(this.clientes);
  }

  // Actualizar cliente
  updateCliente(updated: Cliente): void {

    if(updated.clienteId == null) return;

    const index = this.clientes.findIndex(
      c => c.clienteId === updated.clienteId
    );

    if(index !== -1){
      this.clientes[index] = updated;
      this.clientesSubject.next(this.clientes);
    }
  }

  // Eliminar cliente
  deleteCliente(id: number): void {
    this.clientes = this.clientes.filter(
      c => c.clienteId !== id
    );

    this.clientesSubject.next(this.clientes);
  }
}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme-service';
import { SuscripcionEmailsService } from './services/suscripcion-emails-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyfrontend07');

  currentYear = new Date().getFullYear();

  // email
  email = '';
  mensajeEmail = '';

  constructor(private themeService: ThemeService,
              private suscripcionEmailService: SuscripcionEmailsService
  ) {}

  get theme() {
    return this.themeService.getCurrentTheme();
  }

  toggleTheme(){ // cambia de light a dark o viceversa
    this.themeService.toggleTheme();
  }

  ngOnInit(){
    // color inicial usando datos de la cache
    this.themeService.initTheme();

  }


  guardarEmail() {
    const emailLimpio = this.email.trim();

    if (!emailLimpio) return;

    this.suscripcionEmailService.agregarEmail(emailLimpio);

    this.mensajeEmail = `El email ${emailLimpio} ha sido registrado correctamente`;

    this.email = '';

    setTimeout(() => {
      this.mensajeEmail = '';
    }, 3000);
  }
}

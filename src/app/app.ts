import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyfrontend07');

  currentYear = new Date().getFullYear();

  constructor(private themeService: ThemeService) {}

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
}

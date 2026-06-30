import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = ""; //  "dark" | "light"

  getCurrentTheme(){
    return this.currentTheme;
  }

  toggleTheme(){
    this.currentTheme = (this.currentTheme == "dark") ? "light" : "dark";

    document.body.setAttribute("data-bs-theme", this.currentTheme);
  }

  initTheme(){
    this.currentTheme = localStorage.getItem("theme") ?? "dark"

    document.body.setAttribute("data-bs-theme", this.currentTheme);
  }
}

import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes, // activar el sistema de rutas de Angular
      withInMemoryScrolling({ // como manejar el scroll cuando cambia la ruta
        scrollPositionRestoration: 'top' // cada vez que cambias de pagina el scroll vuelve arriba automáticamente
      })
    )
  ]
};

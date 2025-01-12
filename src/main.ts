import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component'; // Cambia la ruta a donde está definido tu componente principal
import { routes } from './app/app.routes'; // Asegúrate de exportar 'routes' correctamente desde el archivo de rutas

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));

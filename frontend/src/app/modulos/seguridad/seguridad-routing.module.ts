import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cambioClave',
    component:CambioClaveComponent
  },
  {
    path: 'identificar',
    component : IdentificacionComponent
  },
  {
    path: 'recuperarClave',
    component:RecuperarClaveComponent
  },
  {
    path: 'cerrarSesion',
    component:CerrarSesionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }

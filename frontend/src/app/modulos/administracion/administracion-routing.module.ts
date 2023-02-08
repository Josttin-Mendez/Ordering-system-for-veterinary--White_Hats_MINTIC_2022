import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';

const routes: Routes = [
  {
    path: 'crearPersona',
    component:CrearPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editarPersona/:id',
    component : EditarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminarPersona',
    component:EliminarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'buscarPersona',
    component : BuscarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listarPersonas',
    component : BuscarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },



  {
    path: 'crearProducto',
    component:CrearProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editarProducto/:id',
    component : EditarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminarProducto',
    component:EliminarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'buscarProducto',
    component : BuscarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listarProductos',
    component : BuscarProductoComponent,
    canActivate: [ValidadorSesionGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }

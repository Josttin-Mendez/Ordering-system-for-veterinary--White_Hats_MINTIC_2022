import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { AsignarPedidoComponent } from './asignar-pedido/asignar-pedido.component';


@NgModule({
  declarations: [
    AsignarPedidoComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule
  ]
})
export class PedidosModule { }

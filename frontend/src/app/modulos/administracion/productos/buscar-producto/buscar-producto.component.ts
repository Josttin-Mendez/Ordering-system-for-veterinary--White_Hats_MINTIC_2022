import { ProductoService } from './../../../../servicios/producto.service';
import { ModeloProducto } from './../../../../modelos/producto.modelo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styleUrls: ['./buscar-producto.component.css']
})
export class BuscarProductoComponent implements OnInit{

  listadoRegistros: ModeloProducto[] = [];

  constructor(private productoServicio: ProductoService ){}

  ngOnInit(): void {
    this.ObtenerListadoProducto();
  }

  ObtenerListadoProducto(){
    this.productoServicio.ObtenerRegistros().subscribe((datos: ModeloProducto[])=>{
      this.listadoRegistros = datos;
    })
  }


}

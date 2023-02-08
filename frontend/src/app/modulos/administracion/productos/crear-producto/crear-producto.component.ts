import { ProductoService } from './../../../../servicios/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent  implements OnInit {

  fgValidador: FormGroup = this.fb.group({

    'nombre': ['',[Validators.required]],
    'precio': ['',[Validators.required]],
    'imagen': ['',[Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioProducto : ProductoService,
    private router : Router){

  }
  ngOnInit(): void {

  }
  GuardarProducto(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let imagen = this.fgValidador.controls["imagen"].value.substring(12);
    imagen = "/assets/imagen/"+imagen
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    this.servicioProducto.CrearProducto(p).subscribe((datos: ModeloProducto) =>{
      alert("Producto Almacenado correctamente");
      this.router.navigate(["/administracion/listarProductos"]);
    },(error: any)=>{
      alert("Error al almacenar el producto");
    })
  }

}

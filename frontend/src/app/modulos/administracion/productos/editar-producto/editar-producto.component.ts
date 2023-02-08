import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent  implements OnInit {
id: string= '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['',[Validators.required]],
    'nombre': ['',[Validators.required]],
    'precio': ['',[Validators.required]],
    'imagen': ['',[Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioProducto : ProductoService,
    private router : Router,
    private route: ActivatedRoute
    ){

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarProducto();
  }
    BuscarProducto(){
    this.servicioProducto.ObtenerRegistroPorId(this.id).subscribe((datos: ModeloProducto)=>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["precio"].setValue(datos.precio);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
    } );

    }
EditarProducto(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let imagen = this.fgValidador.controls["imagen"].value.substring(12);
    imagen = "/assets/imagen/"+imagen
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.imagen = imagen;
    p.id =this.id;
    this.servicioProducto.ActualizarProducto(p).subscribe((datos: ModeloProducto) =>{
      alert("Producto actualizado correctamente");
      this.router.navigate(["/administracion/listarProductos"]);
    },(error: any)=>{
      alert("Error al actualizar el producto");
    })
  }

}

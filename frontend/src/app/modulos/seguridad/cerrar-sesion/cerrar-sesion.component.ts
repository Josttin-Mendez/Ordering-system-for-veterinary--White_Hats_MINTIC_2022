import { Router } from '@angular/router';
import { SeguridadService } from './../../../servicios/seguridad.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit{
  
  constructor(private servicioSeguridad : SeguridadService,
     private router: Router ){}

  ngOnInit(): void {
    this.servicioSeguridad.EliminarInformacionSesion();
    this.router.navigate(['/inicio'])
  }

}

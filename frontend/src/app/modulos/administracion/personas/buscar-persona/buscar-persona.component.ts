import { ModeloPersona } from './../../../../modelos/persona.modelo';
import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit{

  listadoRegistros: ModeloPersona[] = [];

  constructor(private personaServicio: PersonaService ){}

  ngOnInit(): void {
    this.ObtenerListadoPersona();
  }

  ObtenerListadoPersona(){
    this.personaServicio.ObtenerRegistros().subscribe((datos: ModeloPersona[]) => {
      this.listadoRegistros = datos;
    })
  }

}

import { ModeloPersona } from './../modelos/persona.modelo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from './seguridad.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {


  url ='http://localhost:3000';
  token: String ='';

  constructor(private http:HttpClient, private seguridadService: SeguridadService) {

    this.token = this.seguridadService.ObtenerToken();

   }

  ObtenerRegistros():Observable<ModeloPersona[]>{
    return this.http.get<ModeloPersona[]>(`${this.url}/personas`);
  }
  ObtenerRegistroPorId(id: string):Observable<ModeloPersona>{
    return this.http.get<ModeloPersona>(`${this.url}/personas/${id}`);
  }

  CrearPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.post<ModeloPersona>(`${this.url}/personas`, persona,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })

  }

  ActualizarPersona(persona: ModeloPersona): Observable<ModeloPersona>{
    return this.http.put<ModeloPersona>(`${this.url}/personas/${persona.id}`, persona,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })

  }

  EliminarPersona(id: string): Observable<any>{
    return this.http.delete(`${this.url}/persona/${id}` ,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })

  }
}

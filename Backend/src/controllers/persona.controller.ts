import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Llaves } from '../config/llaves';
import {Persona} from '../models';
import { Credenciales } from '../models/credenciales.model';
import { PersonaRepository } from '../repositories';
import { AutenticacionService } from '../services';
const fetch = require('node-fetch');

@authenticate('admin')
export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @service(AutenticacionService)
    public autenticacionService : AutenticacionService
  ) {}
@authenticate.skip()
  @post('/identificarPersona',
  {
    responses: {
      '200': { description : "Identificación correcta" }
    }
  })
  async identificarPersona(
    @requestBody() credenciales : Credenciales
  )
  {
    let p = await this.autenticacionService.IdentificarPersona(credenciales.usuario,credenciales.clave);
    if(p){
      let token = this.autenticacionService.GenerarTokenJWT(p);
      return {
        datos: {
          nombre : p.nombres + " " + p.apellidos,
          correo : p.correo,
          id : p.id,
          rol : p.rol
        },
        tk : token
      }
    }else{
      throw new HttpErrors[401]("Credenciales incorrectas");
    }
  }

  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {

    // Generar clave
    let clave = this.autenticacionService.GenerarClave();
    let claveCifrada = this.autenticacionService.CifrarClave(clave);
    persona.clave = claveCifrada;
    let p = await  this.personaRepository.create(persona);

    // Notificar por sms al usuario la clave generada  
    let correo_destino=persona.correo;
    let asunto = 'Datos de registro en la plataforma';
    let contenido = `Hola ${persona.nombres} Bienvenido a la plataforma de Pedidos, su usuario es ${persona.correo} y su contraseña es ${clave}`;
    fetch (`http://127.0.0.1:5000/email?correo_destino=${correo_destino}&asunto=${asunto}&contenido=${contenido}`)
    .then((data:any)=>{
      console.log(data);
    });
    return p;

  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }
@authenticate.skip()
  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }
@authenticate.skip()
  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}

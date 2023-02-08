import { PersonaRepository } from './../repositories/persona.repository';
import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Persona } from '../models';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';

const generator = require('password-generator');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository
    ) 
    {}

  /*
   * Add service methods here
   */

  GenerarClave()
  {
    return generator(8, false);
  }

  CifrarClave(clave : string){
    return cryptojs.MD5(clave).toString();
  }

  IdentificarPersona(usuario : string, clave : string){
    try{
      let p = this.personaRepository.findOne({
        where : {
          correo : usuario,
          clave : clave
        }
      });
      if (p){
        return p;
      }
      return false;
      
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(persona : Persona){
    let token = jwt.sign({
      data : {
        id : persona.id,
        correo : persona.correo,
        nombre : persona.nombres + " " + persona.apellidos,
        rol: persona.rol
      }
    }, Llaves.claveJWT);

    return token;
  }

  VerificarTokenJWT(token : string){
    try{
      let decoded = jwt.verify(token, Llaves.claveJWT);
      return decoded;
    }
    catch{
      return false;
    }
  }
}

import { AutenticacionService } from '../services/autenticacion.service';
import { AuthenticationStrategy } from "@loopback/authentication";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { service } from '@loopback/core';

export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = 'admin';

    constructor(
        @service(AutenticacionService) 
        public autenticacionService: AutenticacionService
    ){}

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if(token){
            let datos = this.autenticacionService.VerificarTokenJWT(token);
            if(datos){
                if(datos.data.rol == 'admin'){
                    let perfil : UserProfile = Object.assign({
                        nombre : datos.data.nombre
                    });
                    return perfil;
                }
                throw new HttpErrors.Unauthorized('No tiene permisos para acceder a este recurso');
            }else{
                throw new HttpErrors[401]("Token invalido");
            }
        }else{
            throw new HttpErrors[401]('No se ha enviado el token');
        }
    }
}
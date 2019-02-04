import {Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import { UsuarioEntity } from './usuario/usuario.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _usuarioService: UsuarioService) {

  }


  @Post('login')
  @HttpCode(200)
  async ejecutarLogin(
    @Body('username') username:string,
    @Body('password') password:string,
    @Res() res
  ){
    const respuesta = await this._usuarioService
      .autenticar(username, password);

    if(respuesta){
      //res.send('ok');
      res.redirect('comida/inicio')
    }else{
      res.redirect('login.html');
    }
  }


}
export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  fecha_nacimiento: string;
}

export interface Comida {
  id?: number;
  nombrePlato: string;
  descricionPlato: string;
  nacionalidad: string;
  numeroPersonas: number;
  picante: boolean;
}

export interface Ingrediente {
  id?: number;
  nombreIngrediente: string;
  cantidad: number;
  descripcionPreparacion: string;
  opcional: boolean;
  tipoIngrediente:string,
  necesitaRefrigeracion: boolean;
}

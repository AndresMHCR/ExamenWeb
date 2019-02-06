import { Body, Controller, Get, HttpCode, Post, Query, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import { UsuarioEntity } from './usuario/usuario.entity';
import { FindManyOptions, Like } from 'typeorm';
import { IngredienteEntity } from './ingrediente/ingrediente.entity';
import { EventoService } from './eventos/evento.service';
import { ComidaEntity } from './comida/comida.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _usuarioService: UsuarioService,
              private readonly _eventoService: EventoService) {

  }

  @Get('eventos')
  async cargarEventos(
    @Res() res,
    @Query('busqueda') busqueda:string
  ){
    const eventos = await this._eventoService.buscar()
    res.render('eventos',
      {
        arreglo: eventos
      })
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

    const idUsuario = await this._usuarioService
      .buscar()


    if(respuesta){
      //res.send('ok');
      const parametroConsulta = `?idUsuario=${username}`
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
  fecha_nacimiento: Date;
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
  tipoIngrediente: string;
  necesitaRefrigeracion: boolean;
  comida: ComidaEntity;
}

export interface Evento {
  id?: number;
  nombreEvento: string;
  fechaEvento: Date;
  latitud: string;
  longitud: string;
  ingredientes:IngredienteEntity[];
}

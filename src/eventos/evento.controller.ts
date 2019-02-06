
import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Usuario} from "../app.controller";

import {FindManyOptions, Like} from "typeorm";

import {validate, ValidationError} from "class-validator";
import { EventoService } from './evento.service';
import { EventoEntity } from './evento.entity';


@Controller('evento')
export class EventoController {

  constructor(private readonly _eventoService: EventoService) {

  }

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('nombre') nombre: string
  ) {

    let mensaje = undefined;
    let clase = undefined;

    if (accion && nombre) {
      switch (accion) {
        case 'borrar':
          mensaje = `Registro ${nombre} eliminado.`;
          clase = 'alert alert-danger';
          break;

        case 'actualizar':
          mensaje = `Registro ${nombre} actualizado.`;
          clase = 'alert alert-info';
          break;
      }
    }

    let eventos: EventoEntity[];

    if (busqueda) {

      const consulta: FindManyOptions<EventoEntity> = {
        where: [
            {
              nombre: Like(`%${busqueda}%`)
            }
        ]
      };

      eventos = await this._eventoService.buscar(consulta);

    } else {
      eventos = await this._eventoService.buscar();
    }


    response.render(
      'eventos',
      {
        usuario: 'Adrian',
        arreglo: eventos, // AQUI!
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Get('detalle/:idEvento')
  async verEvento(
    @Param('idEvento')idEvento: string,
    @Res() response,
    //@Session() session,
  ) {
    /*
    let admin =undefined;
    let usuario = undefined;
    if(session.usuario){

      if (session.usuario.esUsuario){
        usuario = true
      }
      if(session.usuario.esAdministrador){
        admin = true
      }
    }*/
    const eventoEncontrado = await this._eventoService
      .buscarPorId(+idEvento);
    response.render(
      'detalle-evento',
      {
        //esUsuario:usuario,
        //esAdministrador:admin,
        titulo:"Ver evento",
        evento:eventoEncontrado,
      })
  }


  @Post('eliminar/:idEvento')
  async eliminar(
    @Res() response,
    @Param('idEvento') idEvento: string,
  ) {

    const evento = await this._eventoService.buscarPorId(+idEvento);

    await this._eventoService.eliminar(Number(idEvento));

    const parametrosConsulta = `?accion=borrar&nombre=${
      evento.nombreEvento
      }`;

    response.redirect('/evento/inicio' + parametrosConsulta)
  }

  @Get('registrar')
  async mostrarRegistro(
    @Res() response,
    @Query('busqueda') busqueda: string,
  ) {
    let eventos: EventoEntity[];

    if (busqueda) {

      const consulta: FindManyOptions<EventoEntity> = {
        where: [
          {
            nombreEvento: Like(`%${busqueda}%`)
          }
        ]
      };

      eventos = await this._eventoService.buscar(consulta);

    } else {
      eventos = await this._eventoService.buscar();
    }
    response.render('registro-evento',
      {
        arreglo: eventos
      })
  }

  @Get('editar/:idEvento')
  async editarEvento(
    @Param('idEvento')idEvento: string,
    @Res() response,
    //@Session() session,
  ) {
    /*
    let admin =undefined;
    let usuario = undefined;
    if(session.usuario){

      if (session.usuario.esUsuario){
        usuario = true
      }
      if(session.usuario.esAdministrador){
        admin = true
      }
    }*/
    const eventoEncontrado = await this._eventoService
      .buscarPorId(+idEvento);
    response.render(
      'editar-evento',
      {
        //esUsuario:usuario,
        //esAdministrador:admin,
        //titulo:"Editar evento",
        evento:eventoEncontrado,
      })
  }

}
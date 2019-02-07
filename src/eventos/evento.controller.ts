
import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import {Usuario} from "../app.controller";

import {FindManyOptions, Like} from "typeorm";

import {validate, ValidationError} from "class-validator";
import { EventoService } from './evento.service';
import { EventoEntity } from './evento.entity';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';


@Controller('evento')
export class EventoController {

  constructor(private readonly _eventoService: EventoService,
              private readonly _ingredienteService: IngredienteService) {

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

    response.redirect('/evento/registrar' + parametrosConsulta)
  }

  @Get('registrar')
  async mostrarRegistro(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Session() sesion
  ) {

    if(!sesion.usuario){
      response.redirect('/login')
    }
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
  async agregarIngrediente(
    @Res() response,
    @Param('idEvento') idEvento: string,
    @Session() sesion
  ){
    if(!sesion.usuario){
      response.redirect('/login')
    }

    let ingredientes: IngredienteEntity[];
    ingredientes = await this._ingredienteService.buscar();

    //response.send(idEvento)
    const eventoEncontrado = await this._eventoService
      .buscarPorId(+idEvento);
    response.render(
      'agregarAEvento',
      {
        //esUsuario:usuario,
        //esAdministrador:admin,
        //titulo:"Editar evento",
        evento: eventoEncontrado,
        ingredientes: ingredientes
      })
    //response.render('agregarAEvento')
  }

  @Post('editar/:idEvento')
  async agregarIngredientePost(
    @Res() response,
    @Param('idEvento') idEvento: string,
    @Query('idIngrediente') idIngrediente:IngredienteEntity
  ) {
    const evento = await this._eventoService
      .buscarPorId(+idEvento);

    //response.send(evento);
    const ingrediente = await this._ingredienteService
      .buscarPorId(+idIngrediente)


    evento.ingredientes.push(ingrediente);
    this._eventoService.actualizar(evento);

    //response.send(evento);

    const parametrosConsulta = `/${idEvento}`;
    response.redirect('/evento/editar' + parametrosConsulta)
  }

  @Post('quitar/:idEvento')
  async quitarIngredientePost(
    @Res() response,
    @Param('idEvento') idEvento: string,
    @Query('idIngrediente') idIngrediente:IngredienteEntity
  ) {
    const evento = await this._eventoService
      .buscarPorId(+idEvento);

    const ingrediente = await this._ingredienteService
      .buscarPorId(+idIngrediente)


    const indexIngrediente = await evento.ingredientes.indexOf(idIngrediente);

    evento.ingredientes.splice(indexIngrediente,1);

    this._eventoService.actualizar(evento);

    //response.send(evento);

    const parametrosConsulta = `/${idEvento}`;
    response.redirect('/evento/editar' + parametrosConsulta)
  }

  @Get('crear-evento')
  async crearEventoGet(
    @Res() response,
    @Session() sesion

  ){
    if(!sesion.usuario){
      response.redirect('/login')
    }
    response.render('crear-evento')
  }

  @Post('crear-evento')
  async crearEventoPost(
    @Res() response,
    @Body() evento: EventoEntity

  ){
    const respuesta = await this._eventoService.crear(evento);

    const parametrosConsulta = `?accion=crear&nombre=${evento.nombreEvento}`;

    response.redirect(
      '/evento/registrar' + parametrosConsulta
    )

  }



}
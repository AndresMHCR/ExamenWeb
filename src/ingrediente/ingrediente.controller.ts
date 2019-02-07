
import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import { Comida, Ingrediente, Usuario } from '../app.controller';

import { FindManyOptions, getConnection, Like } from 'typeorm';
import {validate, ValidationError} from "class-validator";
import { IngredienteService } from './ingrediente.service';
import { IngredienteEntity } from './ingrediente.entity';
import { ComidaEntity } from '../comida/comida.entity';

@Controller('ingrediente')
export class IngredienteController {

  constructor(private readonly _ingredienteService: IngredienteService) {

  }

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('idComida') idComida: number,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('nombre') nombre: string,
    @Session() sesion
  ) {
    if(!sesion.usuario){
      response.redirect('/login')
    }

    let mensaje = undefined;
    let clase = undefined;
    let ingredientes: IngredienteEntity[];

    if(idComida &&  accion && nombre){  //acomodar esto
      //response.send('ok');

      const consulta: FindManyOptions<IngredienteEntity> = {
        where: [
          {
            comida: Like(`%${idComida}%`)
          }
        ]
      };
      ingredientes = await this._ingredienteService.buscar(consulta);
      //response.send(ingredientes);
      switch (accion) {
        case 'borrar':
          mensaje = `Ingrediente ${nombre} eliminado.`;
          clase = 'alert alert-danger';
          break;

        case 'actualizar':
          mensaje = `Ingrediente ${nombre} actualizado.`;
          clase = 'alert alert-info';
          break;
      }
    }

    if (idComida){
      const consulta: FindManyOptions<IngredienteEntity> = {
        where: [
          {
            comida: Like(`%${idComida}%`)
          }
        ]
      };
      ingredientes = await this._ingredienteService.buscar(consulta);
    }else {
      ingredientes = await this._ingredienteService.buscar();
    }

    if (accion && nombre) {
      switch (accion) {
        case 'borrar':
          mensaje = `Ingrediente ${nombre} eliminado.`;
          clase = 'alert alert-danger';
          break;

        case 'actualizar':
          mensaje = `Ingrediente ${nombre} actualizado.`;
          clase = 'alert alert-info';
          break;
      }
    }

    //let ingredientes: IngredienteEntity[];

    if (busqueda) {

      const consulta: FindManyOptions<IngredienteEntity> = {
        where: [
          {
            nombre: Like(`%${busqueda}%`)
          }
        ]
      };

      ingredientes = await this._ingredienteService.buscar(consulta);

    }




    response.render(
      'ingredientes',
      {
        usuario: 'Adrian',
        arreglo: ingredientes, // AQUI!
        booleano: false,
        mensaje: mensaje,
        clase: clase,
        idreferencia: idComida
      }
    );
  }

  @Get('crear-ingrediente')
  crearIngredienteRuta(
    @Res() response,
    @Query('idComida') idComida: number,
    @Session() sesion
  ) {

    if(!sesion.usuario){
      response.redirect('/login')
    }
    response.render(
      'crear-ingrediente',
      {
        titulo:'Agregar Ingrediente',
        idref: idComida
      }
    )
  }

  @Post('crear-ingrediente')
  async crearIngredienteFuncion(
    @Res() response,
    @Body() ingrediente: Ingrediente,
    @Query('idComida') idComida: ComidaEntity
  ) {
    /*
        const objetoValidacionNoticia = new CreateNoticiaDto();

        objetoValidacionNoticia.titulo = comida.titulo;
        objetoValidacionNoticia.descripcion = comida.descripcion;

        const errores: ValidationError[] =
          await validate(objetoValidacionNoticia);

        const hayErrores = errores.length>0;

        if(hayErrores){
          console.error(errores);
          //redirect crear noticia, y
          //en crear noticia deberian mostrar mensajes
          //como en la pantalla de Inicio

          throw new BadRequestException({mensaje:'Error de validacion'})
        }else{*/
    ingrediente.comida = idComida;
    const respuesta = await this._ingredienteService.crear(ingrediente);
    const parametrosConsulta = `?idComida=${idComida}&accion=crear&nombre=${ingrediente.nombreIngrediente}`;

    response.redirect(
      '/ingrediente/inicio' + parametrosConsulta
    )

  }

  @Post('eliminar/:idIngrediente')
  async eliminar(
    @Res() response,
    @Param('idIngrediente') idIngrediente: string,
  ) {

    const ingrediente = await this._ingredienteService.buscarPorId(+idIngrediente);

    await this._ingredienteService.eliminar(Number(idIngrediente));

    const parametrosConsulta = `?accion=borrar&nombre=${
      ingrediente.nombreIngrediente
      }`;

    response.redirect('/ingrediente/inicio' + parametrosConsulta)
  }



  @Get('actualizar-ingrediente/:idIngrediente')
  async actualizarComidaVista(
    @Res() response,
    @Param('idIngrediente') idIngrediente: string,
    @Query('idComida') idComida:number,
    @Session() sesion
  ) {
    if(!sesion.usuario){
      response.redirect('/login')
    }
    // El "+" le transforma en numero a un string
    // numerico
    const ingredienteEncontrado = await this._ingredienteService
      .buscarPorId(+idIngrediente);

    response
      .render(
        'crear-ingrediente',
        {
          ingrediente: ingredienteEncontrado,
          idref: idComida
        }
      )


  }

  @Post('actualizar-ingrediente/:idIngrediente')
  async actualizarComidaMetodo(
    @Res() response,
    @Param('idIngrediente') idIngrediente: string,
    @Body() ingrediente: Ingrediente,
    @Query('idComida') idComida: number


  ) {
    ingrediente.id = +idIngrediente;
    await this._ingredienteService.actualizar(ingrediente);

    const parametrosConsulta = `?idComida=${idComida}&accion=actualizar&nombre=${ingrediente.nombreIngrediente}`;

    response.redirect('/ingrediente/inicio' + parametrosConsulta);

  }
}
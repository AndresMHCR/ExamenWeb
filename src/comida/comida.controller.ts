
import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import { Comida, Usuario } from '../app.controller';

import { FindManyOptions, FindOneOptions, Like } from 'typeorm';
import {validate, ValidationError} from "class-validator";
import { ComidaService } from './comida.service';
import { ComidaEntity } from './comida.entity';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('comida')
export class ComidaController {

  constructor(private readonly _comidaService: ComidaService) {

  }

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('idUsuario') idUsuario: string,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('nombre') nombre: string
  ) {

    let mensaje = undefined;
    let clase = undefined;
    let comidas: ComidaEntity[];

   /* if(idUsuario){  //acomodar esto
      //response.send('ok');

      const consulta: FindManyOptions<ComidaEntity> = { //arreglar esto con respecto al usuario con nombre que liste comidas por usuario
        where: [
          {
            usuario: Like(`%${idUsuario}%`)
          }
        ]
      };
      comidas = await this._comidaService.buscar(consulta);
      //response.send(ingredientes);
    }*/
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
        case 'crear':
          mensaje = `Registro ${nombre} creado.`;
          clase = 'alert alert-success';
          break;
      }
    }

    if (busqueda) {

      const consulta: FindManyOptions<ComidaEntity> = {
        where: [
          {
            nombrePlato: Like(`%${busqueda}%`)
          }
        ]
      };

      comidas = await this._comidaService.buscar(consulta);

    }else {
      comidas = await this._comidaService.buscar();
    }


    response.render(
      'comidas',
      {
        usuario: 'Adrian',
        arreglo: comidas, // AQUI!
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Get('crear-comida')
  crearComidaRuta(
    @Res() response
  ) {
    response.render(
      'crear-comida',
      {
        titulo:'Agregar Comida'
      }
    )
  }

  @Post('crear-comida')
  async crearComidaFuncion(
    @Res() response,
    @Body() comida: Comida
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
      const respuesta = await this._comidaService.crear(comida);

      const parametrosConsulta = `?accion=crear&nombre=${comida.nombrePlato}`;

      response.redirect(
        '/comida/inicio' + parametrosConsulta
      )

  }


  @Post('eliminar/:idComida')
  async eliminar(
    @Res() response,
    @Param('idComida') idComida: string,
  ) {

    const comida = await this._comidaService.buscarPorId(+idComida);

    await this._comidaService.eliminar(Number(idComida));

    const parametrosConsulta = `?accion=borrar&nombre=${
      comida.nombrePlato
      }`;

    response.redirect('/comida/inicio' + parametrosConsulta)
  }



  @Get('actualizar-comida/:idComida')
  async actualizarComidaVista(
    @Res() response,
    @Param('idComida') idComida: string,
  ) {
    // El "+" le transforma en numero a un string
    // numerico
    const comidaEncontrada = await this._comidaService
      .buscarPorId(+idComida);

    response
      .render(
        'crear-comida',
        {
          comida: comidaEncontrada
        }
      )


  }

  @Post('actualizar-comida/:idComida')
  async actualizarComidaMetodo(
    @Res() response,
    @Param('idComida') idComida: string,
    @Body() comida: Comida
  ) {
    comida.id = +idComida;
    await this._comidaService.actualizar(comida);

    const parametrosConsulta = `?accion=actualizar&nombre=${comida.nombrePlato}`;

    response.redirect('/comida/inicio' + parametrosConsulta);

  }
}
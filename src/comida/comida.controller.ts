
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

    if(idUsuario){  //acomodar esto
      //response.send('ok');

      const consulta: FindManyOptions<ComidaEntity> =  //arreglar que se vea las comidas de acuerdo al usuario con el nombre
        where: [
          {
            usuario: Like(`%${idUsuario}%`)
          }
        ]
      };
      comidas = await this._comidaService.buscar(consulta);
      //response.send(ingredientes);
    }else {
      comidas = await this._comidaService.buscar();
    }
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

    if (busqueda) {

      const consulta: FindManyOptions<ComidaEntity> = {
        where: [
          {
            nombre: Like(`%${busqueda}%`)
          }
        ]
      };

      comidas = await this._comidaService.buscar(consulta);

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
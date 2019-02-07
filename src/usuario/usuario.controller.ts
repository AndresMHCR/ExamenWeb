
import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import {Usuario} from "../app.controller";

import {FindManyOptions, Like} from "typeorm";

import {validate, ValidationError} from "class-validator";
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

  constructor(private readonly _usuarioService: UsuarioService) {

  }

  @Get('inicio')
  async inicio(
    @Res() response,
    @Query('busqueda') busqueda: string,
    @Query('accion') accion: string,
    @Query('nombre') nombre: string,
    @Session() sesion
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

    let usuarios: UsuarioEntity[];

    if (busqueda) {

      const consulta: FindManyOptions<UsuarioEntity> = {
        where: [
            {
              nombre: Like(`%${busqueda}%`)
            }
        ]
      };

      usuarios = await this._usuarioService.buscar(consulta);

    } else {
      usuarios = await this._usuarioService.buscar();
    }


    response.render(
      'usuarios',
      {
        usuario: 'Adrian',
        arreglo: usuarios, // AQUI!
        booleano: false,
        mensaje: mensaje,
        clase: clase
      }
    );
  }

  @Post('eliminar/:idUsuario')
  async eliminar(
    @Res() response,
    @Param('idUsuario') idUsuario: string,
  ) {

    const usuario = await this._usuarioService.buscarPorId(+idUsuario);

    await this._usuarioService.eliminar(Number(idUsuario));

    const parametrosConsulta = `?accion=borrar&nombre=${
      usuario.nombre
      }`;

    response.redirect('/usuario/inicio' + parametrosConsulta)
  }



  @Get('actualizar-usuario/:idUsuario')
  async actualizarUsuarioVista(
    @Res() response,
    @Param('idUsuario') idUsuario: string,
  ) {
    // El "+" le transforma en numero a un string
    // numerico
    const usuarioEncontrado = await this._usuarioService
      .buscarPorId(+idUsuario);

    response
      .render(
        'rolesUsuario',
        {
          usuario: usuarioEncontrado
        }
      )


  }

  @Post('actualizar-usuario/:idUsuario')
  async actualizarNoticiaMetedo(
    @Res() response,
    @Param('idUsuario') idUsuario: string,
    @Body() usuario: Usuario
  ) {
    usuario.id = +idUsuario;
    await this._usuarioService.actualizar(usuario);

    const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;

    response.redirect('/usuario/inicio' + parametrosConsulta);

  }
}
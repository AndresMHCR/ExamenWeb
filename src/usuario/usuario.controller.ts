
import { BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session } from '@nestjs/common';
import {Usuario} from "../app.controller";

import {FindManyOptions, Like} from "typeorm";

import {validate, ValidationError} from "class-validator";
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { RolEntity } from '../rol/rol.entity';
import { RolService } from '../rol/rol.service';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';
import { UsuarioLoginDto } from './dto/usuario-login.dto';
import { UsuarioRegistroDto } from './dto/usuario-registro.dto';

@Controller('usuario')
export class UsuarioController {

  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _rolService: RolService) {

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
    @Query('errorRol') errorRol:string
  ) {
    // El "+" le transforma en numero a un string
    // numerico
    const usuarioEncontrado = await this._usuarioService
      .buscarPorId(+idUsuario);

    let roles: RolEntity[]

    roles = await this._rolService.buscar();
    if(errorRol){
      const clase = 'alert alert-danger';
      response
        .render(
          'rolesUsuario',
          {
            usuario: usuarioEncontrado,
            roles: roles,
            clase: clase,
            mensaje: 'Este usuario ya tiene rol'
          }
        )
    }else {
      response
        .render(
          'rolesUsuario',
          {
            usuario: usuarioEncontrado,
            roles: roles
          }
        )

    }
  }

  @Post('actualizar-usuario/:idUsuario')
  async actualizarNoticiaMetedo(
    @Res() response,
    @Param('idUsuario') idUsuario: string,
    @Body() usuario: Usuario,
    @Query('errorRol') errorRol:string
  ) {

    if(errorRol)
    {
      const parametros = `/${idUsuario}?errorRol=true`;
      response.redirect('/actualizar-usuario' + parametros);
    }

    usuario.id = +idUsuario;
    await this._usuarioService.actualizar(usuario);

    const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;

    response.redirect('/usuario/inicio' + parametrosConsulta);

  }

  @Post('agregar-rol/:idUsuario')
  async agregarRolMetodo(
    @Res() response,
    @Param('idUsuario') idUsuario: string,
    @Query('idRol') idRol: RolEntity
  ){
    const usuario = await this._usuarioService
      .buscarPorId(+idUsuario);


    const rolAAgregar = await this._rolService
      .buscarPorId(+idRol)

    const existeRol = usuario.roles.some(
      (rol) => {
        return rol.id === rolAAgregar.id
      }
    );
    if(existeRol){
      const clase = 'alert alert-danger';
      const parametrosConsulta = `/${idUsuario}?errorRol=true`;
      response.redirect('/usuario/actualizar-usuario' + parametrosConsulta );
    } else{
      usuario.roles.push(rolAAgregar);

      this._usuarioService.actualizar(usuario);

      const parametrosConsulta = `/${idUsuario}`;
      response.redirect('/usuario/actualizar-usuario'+parametrosConsulta);
    }


  }

  @Post('quitar-rol/:idUsuario')
  async quitarRolPost(
    @Res() response,
    @Param('idUsuario') idUsuario: string,
    @Query('idRol') idRol: RolEntity
  ) {
    const usuario = await this._usuarioService
      .buscarPorId(+idUsuario);

    const indexRol = await usuario.roles.indexOf(idRol);

    usuario.roles.splice(indexRol,1);

    await this._usuarioService.actualizar(usuario);

    const parametrosConsulta = `/${idUsuario}`;
    response.redirect('/usuario/actualizar-usuario' + parametrosConsulta)
  }


  @Post('crear')
  async PostRegistrarse(
    @Res() response,
    @Body() usuario: Usuario,

  ) {

    const usuarioValidado = new UsuarioRegistroDto();

    usuarioValidado.nombre = usuario.nombre;
    usuarioValidado.correo = usuario.correo;
    usuarioValidado.password = usuario.contrasenia;
    const errores: ValidationError[] = await validate(usuarioValidado);

    const hayErrores = errores.length > 0;

    if(hayErrores){
      response.redirect('/registro?errores=Hayerrores')
    } else {
      //const rol = await this._rolService.buscarPorId(1);

      usuario.roles = [];
      const usuario_nuevo = await this._usuarioService.crear(usuario);
      response.redirect('/login');
    }
  }
}
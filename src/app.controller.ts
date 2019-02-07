import { Body, Controller, Get, HttpCode, Post, Query, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import { UsuarioEntity } from './usuario/usuario.entity';
import { FindManyOptions, FindOneOptions, Like } from 'typeorm';
import { IngredienteEntity } from './ingrediente/ingrediente.entity';
import { EventoService } from './eventos/evento.service';
import { ComidaEntity } from './comida/comida.entity';
import { RolEntity } from './rol/rol.entity';
import { UsuarioLoginDto } from './usuario/dto/usuario-login.dto';
import { validate, ValidationError } from 'class-validator';
import { UsuarioRegistroDto } from './usuario/dto/usuario-registro.dto';
import { EventoEntity } from './eventos/evento.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly _usuarioService: UsuarioService,
              private readonly _eventoService: EventoService) {

  }

  @Get('eventos')
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
            nombreEvento: Like(`%${busqueda}%`)
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

  @Get('login')
  getLogin(
    @Res() response,
    @Query('errores') errores:string
  )
  {
    if(errores) {
      const clase = 'alert alert-danger';
      response.render('login',
        {
          mensaje: "Errores de validacion",
          clase: clase
        })
    }else {
      response.render('login');
    }
  }

  @Post('login')
  @HttpCode(200)
  async ejecutarLogin(
    @Body('correo') correo:string,
    @Body('contrasenia') contrasenia:string,
    @Session() sesion,
    @Res() res
  ){

    const usuarioValidado = new UsuarioLoginDto();
    usuarioValidado.correo = correo;
    usuarioValidado.password = contrasenia;
    const errores: ValidationError[] = await validate(usuarioValidado);

    const hayErrores = errores.length > 0;
    if(hayErrores){
      res.redirect('/login?errores=Hayerrores');

    }else {
      const respuesta = await this._usuarioService
        .autenticar(correo, contrasenia);

      const usuario = await this._usuarioService
        .buscarPorId(respuesta)

      if (usuario !== undefined) {


        sesion.usuario = {

          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          esUsuario: usuario.roles.some((rol) => {
            return rol.nombre === 'usuario';
          }),
          esAdministrador: usuario.roles.some((rol) => {
            return rol.nombre === 'administrador';
          })

        };
        //res.send(sesion)
        if (sesion.usuario.esUsuario) {
          const parametroConsulta = `?idUsuario=${usuario.id}`
          res.redirect('comida/inicio')
        } else if (sesion.usuario.esAdministrador) {
          res.redirect('usuario/inicio')
        } else {
          const clase = 'alert alert-danger';
          res.render('login',
            {
              mensaje: 'No tiene los accesos necesarios',
              clase: clase
            })
        }

      } else {
        const clase = 'alert alert-danger';
        res.render('login',
          {
            mensaje: 'No existe ususario',
            clase: clase
          });
      }
    }
  }

  @Get('logout')
  async logout(
    @Res() res,
    @Session() sesion
  ){
    sesion.usuario = undefined,
    sesion.destroy()
    res.redirect('login')
  }

  @Get('registro')
  async mostrarRegistro(
    @Res() response,
    @Session() sesion,
    @Query('errores') errores:string

  ){
    if(errores) {
      const clase = 'alert alert-danger';
      response.render('registro',
        {
          mensaje: "Errores de validacion",
          clase: clase
        })
    }else {
      sesion.usuario = undefined
      sesion.destroy()
      response.render('registro');
    }


  }


}
export interface Usuario {
  id?: number;
  nombre: string;
  contrasenia:string,
  correo: string;
  fechaNacimiento: Date;
  roles: RolEntity[];
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
  ingredientes :IngredienteEntity[];
}

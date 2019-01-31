import {Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _usuarioService: UsuarioService) {

    }


    @Get('login')
    mostrarLogin(
        @Res() res
    ){
        res.render('login.html')
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
            res.send('ok');
            //res.redirect('menu')
        }else{
            res.redirect('login.html');
        }
    }

    @Get('menu') // url
    mostrarMenu(
        @Res() res
    ){
        res.render('menu')
    }
}

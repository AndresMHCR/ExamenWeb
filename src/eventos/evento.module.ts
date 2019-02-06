import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm'

import { EventoController } from './evento.controller';
import { EventoEntity } from './evento.entity';
import { EventoService } from './evento.service';
import { IngredienteService } from '../ingrediente/ingrediente.service';
import { IngredienteEntity } from '../ingrediente/ingrediente.entity';

@Module({
    imports:[
        TypeOrmModule
            .forFeature([EventoEntity,
              IngredienteEntity
            ])
    ],
    controllers:[
        EventoController
    ],
    providers:[
        EventoService,
      IngredienteService
    ],
    exports: [
        EventoService
    ]
})
export class EventoModule{

}
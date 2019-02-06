import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm'

import { EventoController } from './evento.controller';
import { EventoEntity } from './evento.entity';
import { EventoService } from './evento.service';

@Module({
    imports:[
        TypeOrmModule
            .forFeature([EventoEntity
            ])
    ],
    controllers:[
        EventoController
    ],
    providers:[
        EventoService
    ],
    exports: [
        EventoService
    ]
})
export class EventoModule{

}
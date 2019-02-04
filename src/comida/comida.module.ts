import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';

import { ComidaController } from './comida.controller';
import { ComidaService } from './comida.service';
import { ComidaEntity } from './comida.entity';

@Module({
  imports:[
    TypeOrmModule
      .forFeature([ComidaEntity
      ])
  ],
  controllers:[
    ComidaController
  ],
  providers:[
    ComidaService
  ],
  exports: [
    ComidaService
  ]
})
export class ComidaModule{

}
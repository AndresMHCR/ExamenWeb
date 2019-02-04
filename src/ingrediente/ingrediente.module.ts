import {Module} from "@nestjs/common";

import {TypeOrmModule} from '@nestjs/typeorm';

import { IngredienteController } from './ingrediente.controller';
import { IngredienteService } from './ingrediente.service';
import { IngredienteEntity } from './ingrediente.entity';

@Module({
  imports:[
    TypeOrmModule
      .forFeature([IngredienteEntity
      ])
  ],
  controllers:[
    IngredienteController
  ],
  providers:[
    IngredienteService
  ],
  exports: [
    IngredienteService
  ]
})
export class IngredienteModule{

}
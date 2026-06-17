import { Module } from '@nestjs/common';
import { UsuariosRepository } from './usuarios.repository';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
    controllers: [UsuariosController],
    providers: [UsuariosService, UsuariosRepository],
    exports: [UsuariosService],

})
export class UsuariosModule {}
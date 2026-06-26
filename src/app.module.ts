import { Module } from '@nestjs/common';
import { AutoresModule } from './Modules/autores/autores.module';
import { DatabaseModule } from './db/database/database.module';
import { LivrosModule } from './Modules/Livros/livros.module';
import { UsuariosModule } from './Modules/Usuarios/usuarios.module';

@Module({
  imports: [AutoresModule, DatabaseModule, LivrosModule, UsuariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

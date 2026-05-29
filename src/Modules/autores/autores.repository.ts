import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DRIZZLE } from 'src/db/database/database.constants';
import { autoresTabela } from 'src/db/schemas';
import type { DrizzleDB } from 'src/db/types/drizzleDB';
import { eq } from 'drizzle-orm';
import { CriarAutorDto } from './autores.dto';
import { AtualizarAutorDto } from './autores.dto';

@Injectable()
export class AutoresRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async listarAutores() {
    try {
      return this.db.select().from(autoresTabela);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar autores');
    }
  }

  async listarAutor(id: number) {
    try {
      const autorEncontrado = await this.db
        .select()
        .from(autoresTabela)
        .where(eq(autoresTabela.id, id));

      return autorEncontrado[0];
    } catch (error) {
      throw new InternalServerErrorException('erro ao listar autor');
    }
  }
  async criarAutor(bodyRequest: CriarAutorDto) {
    try {
      await this.db.insert(autoresTabela).values(bodyRequest);

      const autorCriado = await this.db
        .select()
        .from(autoresTabela)
        .where(eq(autoresTabela.email, bodyRequest.email));
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar um autor');
    }
  }

  async atualizarAutor(id: number, bodyRequest: AtualizarAutorDto) {
    try {
      await this.db
        .update(autoresTabela)
        .set(bodyRequest)
        .where(eq(autoresTabela.id, id));

      return 'Autor atualizado com sucesso';
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar autor');
    }
  }

  async deletarAutor(id: number) {
    try {
      await this.db.delete(autoresTabela).where(eq(autoresTabela.id, id));
      return 'Autor deletado com sucesso';
    } catch (error) {
      throw new InternalServerErrorException('Erro ao deletar autor');
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { LivrosRepository } from './livros.repository';
import { criarLivroDto } from './livros.dto';
import { AutoresService } from '../autores/autores.service';

@Injectable()
export class LivrosService {
  constructor(
    private readonly livrosRepository: LivrosRepository,
    private readonly AutoresService: AutoresService,
  ) {}

  async listarLivros() { 
    return await this.livrosRepository.listarLivros()
  }
  async criarLivro(bodyRequest: criarLivroDto) {
    await this.AutoresService.listarAutor(bodyRequest.id_autor);
    return await this.livrosRepository.criarLivro(bodyRequest);
  }

  async listarlivro(id: number) {
    const livrosEncontrado = await this.livrosRepository.listarLivro(id)

    if (!livrosEncontrado) {
      throw new NotFoundException(`Livro de id ${id} não encontrado`);
    }
    return livrosEncontrado
  }
}

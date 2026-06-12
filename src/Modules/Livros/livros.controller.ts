import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { criarLivroDto } from './livros.dto';

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get('listar-livros')
  async listarLivros() {
    return await this.livrosService.listarLivros();
  }
  @Post('criar-livro')
  async criarLivro(@Body() bodyRequest: criarLivroDto) {
    return await this.livrosService.criarLivro(bodyRequest);
  }

  @Get('listar-livro/:id')
  async listarLivro(@Param('id', ParseIntPipe) id: number) {
    return await this.livrosService.listarlivro(id);
  }

  @Get('listar-livros-com-autor')
  async listarLivrosComAutor() {
    return await this.livrosService.listarLivrosComAutor();
  }

  @Get('listar-livro-com-autor/:id')
  async listarLivroComAutor(@Param('id', ParseIntPipe) id: number) {
    return await this.livrosService.listarLivroComAutor(id);
  }
  @Delete('deletar-livro/:id')
  async deletarLivro(@Param('id', ParseIntPipe) id: number) {
    return await this.livrosService.deletarLivro(id);
  }
}

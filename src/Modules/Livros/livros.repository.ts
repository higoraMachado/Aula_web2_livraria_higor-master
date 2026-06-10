import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DRIZZLE } from "src/db/database/database.constants";
import { autoresTabela, livrosTabela} from 'src/db/schemas';
import type { DrizzleDB} from 'src/db/types/drizzleDB';
import { criarLivroDto } from "./livros.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class LivrosRepository {
    constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

    async listarLivros(){
        try{
            const livros = await this.db.select().from(livrosTabela);

            return livros;
        }   catch (error) {
            throw new InternalServerErrorException('Erro ao listar livros')
        }
    }
    async criarLivro(bodyRequest: criarLivroDto) {
        try {   
            await this.db.insert(livrosTabela).values({
                idAutor: bodyRequest.id_autor,
                titulo: bodyRequest.titulo,
                descricrao: bodyRequest.descricao,
            });

            return `Livro ${bodyRequest.titulo} criado com sucesso`;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar livro');
        }
        
    }
    async listarLivro(id: number){
        try{
            const livros = await this.db.select().from(livrosTabela).where(eq(livrosTabela.id,id));

            return livros[0]
        }   catch (error) {
            throw new InternalServerErrorException('Erro ao listar livro')
        }
    }

    async listarLivrosComAutor(){
        try{
            const livrosComAutor = await this.db
            .select()
            .from(livrosTabela)
            .innerJoin(autoresTabela, eq(livrosTabela.idAutor, autoresTabela.id));

            return livrosComAutor;
        }   catch (error) {
            throw new InternalServerErrorException('Erro ao listar livros com autor');
        }
    }
}
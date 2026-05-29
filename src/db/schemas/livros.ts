import {
  int,
  mssqlTable,
  varchar,
  datetime,
  text,
} from 'drizzle-orm/mssql-core';
import { autoresTabela } from './autores';

export const livrosTabela = mssqlTable('livros', {
  id: int().primaryKey().identity(),
  idAutor: int('id_autor')
    .notNull()
    .references(() => autoresTabela.id),
  titulo: varchar('titulo', { length: 100 }).notNull(),
  descricrao: text('descricrao').notNull(),
  criadoEm: datetime('criado_em').notNull().defaultGetDate(),
});
export type criarLivro = typeof livrosTabela.$inferInsert;
export type Livro = typeof livrosTabela.$inferSelect;

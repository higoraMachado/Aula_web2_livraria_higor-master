import { int, 
mssqlTable,
varchar,
datetime,
bit
} from "drizzle-orm/mssql-core";

export const usuariosTabela = mssqlTable('usuarios', {
   id: int().primaryKey().identity(),
   nome: varchar('nome',{ length: 100 }).notNull(),
   email: varchar('email',{ length: 255 }).notNull().unique(),
   passwordMashed: varchar('password_hashed',{ length: 255 }).notNull(),
   ativo: bit('ativo').notNull().default(true),
   criadoEm: datetime('criado_em').notNull().defaultGetDate(),
});

export type Usuario = typeof usuariosTabela.$inferSelect;
export type criarUsuario = typeof usuariosTabela.$inferInsert;

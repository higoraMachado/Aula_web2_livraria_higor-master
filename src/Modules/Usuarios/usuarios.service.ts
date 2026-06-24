import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuariosRepository } from './usuarios.repository';
import { CriarUsuarioDto } from './usuarios.dto';

@Injectable()
export class UsuariosService {
    constructor(private readonly usuariosRepository: UsuariosRepository) {}

    async buscarUsuarioPorEmail(email: string){
        return await this.usuariosRepository.buscarUsuarioPorEmail(email);
    }

    async criarUsuario(usuario: CriarUsuarioDto) {
        const {email, nome, password} = usuario;

        const usuarioEncontrado = await this.buscarUsuarioPorEmail(usuario.email);

        if (usuarioEncontrado) {
            throw new ConflictException('Usuario já cadastrado com este email');
        }

        const passwordMashed = await bcrypt.hash(usuario.password, 10);

        return await this.usuariosRepository.criarUsuario({
            nome: nome,
            email: email,
            password: passwordMashed,
        });
    }
}
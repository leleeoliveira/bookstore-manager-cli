import { AutorRepository } from '../repositories/AutorRepository';
import { Autor, IAutor } from '../models/Autor';
import { Validators } from '../utils/Validators';
import { AppError } from '../utils/AppError';

/**
 * Regras de negócio relacionadas ao gerenciamento de Autores (RF07, RF13).
 */
export class AutorService {
  private repository = new AutorRepository();

  public async cadastrar(dados: IAutor): Promise<Autor> {
    if (!Validators.textoNaoVazio(dados.nome)) {
      throw new AppError('O nome do autor é obrigatório.');
    }
    return this.repository.criar(dados);
  }

  public async listar(): Promise<Autor[]> {
    return this.repository.listarTodos();
  }

  public async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.repository.buscarPorId(id);
    if (!autor) {
      throw new AppError(`Autor com id ${id} não encontrado.`);
    }
    return autor;
  }

  public async atualizar(id: number, dados: IAutor): Promise<Autor> {
    await this.buscarPorId(id); // valida existência
    if (!Validators.textoNaoVazio(dados.nome)) {
      throw new AppError('O nome do autor é obrigatório.');
    }
    const atualizado = await this.repository.atualizar(id, dados);
    if (!atualizado) {
      throw new AppError('Não foi possível atualizar o autor.');
    }
    return atualizado;
  }

  public async remover(id: number): Promise<void> {
    await this.buscarPorId(id); // valida existência
    const possuiLivros = await this.repository.possuiLivrosVinculados(id);
    if (possuiLivros) {
      throw new AppError('Não é possível remover o autor: existem livros vinculados a ele.');
    }
    const removido = await this.repository.remover(id);
    if (!removido) {
      throw new AppError('Não foi possível remover o autor.');
    }
  }
}

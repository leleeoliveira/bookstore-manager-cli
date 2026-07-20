import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { Livro, ILivro } from '../models/Livro';
import { Validators } from '../utils/Validators';
import { AppError } from '../utils/AppError';

/**
 * Regras de negócio relacionadas ao gerenciamento de Livros (RF08, RF13).
 */
export class LivroService {
  private repository = new LivroRepository();
  private autorRepository = new AutorRepository();

  public async cadastrar(dados: ILivro): Promise<Livro> {
    if (!Validators.textoNaoVazio(dados.titulo)) {
      throw new AppError('O título do livro é obrigatório.');
    }
    if (!Validators.numeroPositivo(dados.quantidadeTotal)) {
      throw new AppError('A quantidade total deve ser maior que zero.');
    }

    // RF08: cada livro deve estar vinculado a um autor previamente cadastrado
    const autor = await this.autorRepository.buscarPorId(dados.autorId);
    if (!autor) {
      throw new AppError(`Autor com id ${dados.autorId} não existe. Cadastre o autor antes de vincular o livro.`);
    }

    const livro: ILivro = {
      ...dados,
      quantidadeDisponivel: dados.quantidadeTotal,
    };

    return this.repository.criar(livro);
  }

  public async listar(): Promise<Livro[]> {
    return this.repository.listarTodos();
  }

  public async listarComAutor(): Promise<any[]> {
    return this.repository.listarComNomeAutor();
  }

  public async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.repository.buscarPorId(id);
    if (!livro) {
      throw new AppError(`Livro com id ${id} não encontrado.`);
    }
    return livro;
  }

  public async atualizar(id: number, dados: ILivro): Promise<Livro> {
    const existente = await this.buscarPorId(id);

    if (!Validators.textoNaoVazio(dados.titulo)) {
      throw new AppError('O título do livro é obrigatório.');
    }

    const autor = await this.autorRepository.buscarPorId(dados.autorId);
    if (!autor) {
      throw new AppError(`Autor com id ${dados.autorId} não existe.`);
    }

    // mantém a coerência entre quantidade total e disponível
    const diferenca = dados.quantidadeTotal - existente.quantidadeTotal;
    const novaDisponivel = existente.quantidadeDisponivel + diferenca;

    const atualizado = await this.repository.atualizar(id, {
        ...dados,
        quantidadeDisponivel: novaDisponivel < 0 ? 0 : novaDisponivel,
    });

    if (!atualizado) {
      throw new AppError('Não foi possível atualizar o livro.');
    }
    return atualizado;
  }

  public async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    const possuiEmprestimos = await this.repository.possuiEmprestimosVinculados(id);
    if (possuiEmprestimos) {
      throw new AppError('Não é possível remover o livro: existem empréstimos vinculados a ele.');
    }
    const removido = await this.repository.remover(id);
    if (!removido) {
      throw new AppError('Não foi possível remover o livro.');
    }
  }
}

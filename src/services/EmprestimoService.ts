import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Emprestimo, IEmprestimoDetalhado } from '../models/Emprestimo';
import { AppError } from '../utils/AppError';

/**
 * Regras de negócio relacionadas a Empréstimos e Devoluções (RF10, RF11, RF12, RF13).
 */
export class EmprestimoService {
  private repository = new EmprestimoRepository();
  private livroRepository = new LivroRepository();
  private clienteRepository = new ClienteRepository();

  public async realizarEmprestimo(livroId: number, clienteId: number): Promise<Emprestimo> {
    // Validação: existência do livro
    const livro = await this.livroRepository.buscarPorId(livroId);
    if (!livro) {
      throw new AppError(`Livro com id ${livroId} não existe.`);
    }

    // Validação: existência do cliente
    const cliente = await this.clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new AppError(`Cliente com id ${clienteId} não existe.`);
    }

    // Validação: disponibilidade do livro
    if (livro.quantidadeDisponivel <= 0) {
      throw new AppError(`O livro "${livro.titulo}" não possui exemplares disponíveis no momento.`);
    }

    const emprestimo = await this.repository.criar(livroId, clienteId);
    await this.livroRepository.atualizarQuantidadeDisponivel(livroId, livro.quantidadeDisponivel - 1);

    return emprestimo;
  }

  public async registrarDevolucao(emprestimoId: number): Promise<void> {
    const emprestimo = await this.repository.buscarPorId(emprestimoId);
    if (!emprestimo) {
      throw new AppError(`Empréstimo com id ${emprestimoId} não encontrado.`);
    }
    if (emprestimo.status === 'finalizado') {
      throw new AppError('Este empréstimo já foi finalizado anteriormente.');
    }

    await this.repository.registrarDevolucao(emprestimoId);

    const livro = await this.livroRepository.buscarPorId(emprestimo.livroId);
    if (livro) {
      await this.livroRepository.atualizarQuantidadeDisponivel(livro.id!, livro.quantidadeDisponivel + 1);
    }
  }

  public async listarDetalhados(): Promise<IEmprestimoDetalhado[]> {
    return this.repository.listarDetalhados();
  }
}

import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente, ICliente } from '../models/Cliente';
import { Validators } from '../utils/Validators';
import { AppError } from '../utils/AppError';

/**
 * Regras de negócio relacionadas ao gerenciamento de Clientes (RF09, RF13).
 */
export class ClienteService {
  private repository = new ClienteRepository();

  public async cadastrar(dados: ICliente): Promise<Cliente> {
    if (!Validators.textoNaoVazio(dados.nome)) {
      throw new AppError('O nome do cliente é obrigatório.');
    }
    if (!Validators.emailValido(dados.email)) {
      throw new AppError('E-mail inválido.');
    }

    const existente = await this.repository.buscarPorEmail(dados.email);
    if (existente) {
      throw new AppError('Já existe um cliente cadastrado com este e-mail.');
    }

    return this.repository.criar(dados);
  }

  public async listar(): Promise<Cliente[]> {
    return this.repository.listarTodos();
  }

  public async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.repository.buscarPorId(id);
    if (!cliente) {
      throw new AppError(`Cliente com id ${id} não encontrado.`);
    }
    return cliente;
  }

  public async atualizar(id: number, dados: ICliente): Promise<Cliente> {
    await this.buscarPorId(id);

    if (!Validators.textoNaoVazio(dados.nome)) {
      throw new AppError('O nome do cliente é obrigatório.');
    }
    if (!Validators.emailValido(dados.email)) {
      throw new AppError('E-mail inválido.');
    }

    const atualizado = await this.repository.atualizar(id, dados);
    if (!atualizado) {
      throw new AppError('Não foi possível atualizar o cliente.');
    }
    return atualizado;
  }

  public async remover(id: number): Promise<void> {
    await this.buscarPorId(id);
    const possuiEmprestimos = await this.repository.possuiEmprestimosVinculados(id);
    if (possuiEmprestimos) {
      throw new AppError('Não é possível remover o cliente: existem empréstimos vinculados a ele.');
    }
    const removido = await this.repository.remover(id);
    if (!removido) {
      throw new AppError('Não foi possível remover o cliente.');
    }
  }
}

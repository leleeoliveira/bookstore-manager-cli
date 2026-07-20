import { ClienteService } from '../services/ClienteService';
import { InputHelper } from '../utils/InputHelper';
import { AppError } from '../utils/AppError';

/**
 * Camada responsável pela interação com o usuário via terminal
 * para as operações relacionadas a Clientes (RF09).
 */
export class ClienteController {
  private service = new ClienteService();

  public async cadastrar(): Promise<void> {
    try {
      const nome = await InputHelper.pergunta('Nome do cliente: ');
      const email = await InputHelper.pergunta('E-mail do cliente: ');
      const telefone = await InputHelper.perguntaOpcional('Telefone (opcional): ');
      const cliente = await this.service.cadastrar({ nome, email, telefone });
      console.log(`Cliente cadastrado com sucesso! (id: ${cliente.id})`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async listar(): Promise<void> {
    try {
      const clientes = await this.service.listar();
      if (clientes.length === 0) {
        console.log('Nenhum cliente cadastrado.');
        return;
      }
      console.log('\n--- Lista de Clientes ---');
      clientes.forEach((c) => {
          console.log(`[${c.id}] ${c.nome} - ${c.email} - ${c.telefone ?? 'sem telefone'}`);
      });
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async consultarPorId(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do cliente: ');
      const cliente = await this.service.buscarPorId(id);
      console.log(`[${cliente.id}] ${cliente.nome} - ${cliente.email} - ${cliente.telefone ?? 'sem telefone'}`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async atualizar(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do cliente a atualizar: ');
      const nome = await InputHelper.pergunta('Novo nome: ');
      const email = await InputHelper.pergunta('Novo e-mail: ');
      const telefone = await InputHelper.perguntaOpcional('Novo telefone (opcional): ');
      await this.service.atualizar(id, { nome, email, telefone });
      console.log('Cliente atualizado com sucesso!');
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async remover(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do cliente a remover: ');
      await this.service.remover(id);
      console.log('Cliente removido com sucesso!');
    } catch (error) {
      this.tratarErro(error);
    }
  }

  private tratarErro(error: unknown): void {
    if (error instanceof AppError) {
      console.log(`Aviso: ${error.message}`);
    } else {
      console.log('Ocorreu um erro inesperado:', (error as Error).message);
    }
  }
}

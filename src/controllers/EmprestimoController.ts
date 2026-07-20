import { EmprestimoService } from '../services/EmprestimoService';
import { InputHelper } from '../utils/InputHelper';
import { Validators } from '../utils/Validators';
import { AppError } from '../utils/AppError';

/**
 * Camada responsável pela interação com o usuário via terminal
 * para as operações relacionadas a Empréstimos (RF10, RF11, RF12).
 */
export class EmprestimoController {
  private service = new EmprestimoService();

  public async realizarEmprestimo(): Promise<void> {
    try {
      const livroId = await InputHelper.perguntaNumero('Id do livro: ');
      const clienteId = await InputHelper.perguntaNumero('Id do cliente: ');
      const emprestimo = await this.service.realizarEmprestimo(livroId, clienteId);
      console.log(`Empréstimo registrado com sucesso! (id: ${emprestimo.id})`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async registrarDevolucao(): Promise<void> {
    try {
      const emprestimoId = await InputHelper.perguntaNumero('Id do empréstimo: ');
      await this.service.registrarDevolucao(emprestimoId);
      console.log('Devolução registrada com sucesso!');
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async listar(): Promise<void> {
    try {
      const emprestimos = await this.service.listarDetalhados();
      if (emprestimos.length === 0) {
        console.log('Nenhum empréstimo cadastrado.');
        return;
      }
      console.log('\n--- Lista de Empréstimos ---');
      emprestimos.forEach((e) => {
          const linha =
          `[${e.id}] Livro: ${e.livro_titulo} | Cliente: ${e.cliente_nome} | ` +
          `Empréstimo: ${Validators.formatarData(e.data_emprestimo)} | ` +
          `Devolução: ${Validators.formatarData(e.data_devolucao)} | Status: ${e.status}`;
          console.log(linha);
      });
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

import { AutorService } from '../services/AutorService';
import { InputHelper } from '../utils/InputHelper';
import { AppError } from '../utils/AppError';

/**
 * Camada responsável pela interação com o usuário via terminal
 * para as operações relacionadas a Autores (RF07).
 */
export class AutorController {
  private service = new AutorService();

  public async cadastrar(): Promise<void> {
    try {
      const nome = await InputHelper.pergunta('Nome do autor: ');
      const nacionalidade = await InputHelper.perguntaOpcional('Nacionalidade (opcional): ');
      const autor = await this.service.cadastrar({ nome, nacionalidade });
      console.log(`Autor cadastrado com sucesso! (id: ${autor.id})`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async listar(): Promise<void> {
    try {
      const autores = await this.service.listar();
      if (autores.length === 0) {
        console.log('Nenhum autor cadastrado.');
        return;
      }
      console.log('\n--- Lista de Autores ---');
      autores.forEach((a) => {
          console.log(`[${a.id}] ${a.nome} - ${a.nacionalidade ?? 'não informado'}`);
      });
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async consultarPorId(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do autor: ');
      const autor = await this.service.buscarPorId(id);
      console.log(`[${autor.id}] ${autor.nome} - ${autor.nacionalidade ?? 'não informado'}`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async atualizar(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do autor a atualizar: ');
      const nome = await InputHelper.pergunta('Novo nome: ');
      const nacionalidade = await InputHelper.perguntaOpcional('Nova nacionalidade (opcional): ');
      await this.service.atualizar(id, { nome, nacionalidade });
      console.log('Autor atualizado com sucesso!');
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async remover(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do autor a remover: ');
      await this.service.remover(id);
      console.log('Autor removido com sucesso!');
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

import { LivroService } from '../services/LivroService';
import { InputHelper } from '../utils/InputHelper';
import { AppError } from '../utils/AppError';

/**
 * Camada responsável pela interação com o usuário via terminal
 * para as operações relacionadas a Livros (RF08).
 */
export class LivroController {
  private service = new LivroService();

  public async cadastrar(): Promise<void> {
    try {
      const titulo = await InputHelper.pergunta('Título do livro: ');
      const autorId = await InputHelper.perguntaNumero('Id do autor: ');
      const anoTexto = await InputHelper.perguntaOpcional('Ano de publicação (opcional): ');
      const quantidadeTotal = await InputHelper.perguntaNumero('Quantidade de exemplares: ');

      const livro = await this.service.cadastrar({
          titulo,
          autorId,
          anoPublicacao: anoTexto ? Number(anoTexto) : undefined,
          quantidadeTotal,
          quantidadeDisponivel: quantidadeTotal,
      });
      console.log(`Livro cadastrado com sucesso! (id: ${livro.id})`);
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async listar(): Promise<void> {
    try {
      const livros = await this.service.listarComAutor();
      if (livros.length === 0) {
        console.log('Nenhum livro cadastrado.');
        return;
      }
      console.log('\n--- Lista de Livros ---');
      livros.forEach((l) => {
          console.log(
            `[${l.id}] ${l.titulo} | Autor: ${l.autor_nome} | Ano: ${l.ano_publicacao ?? '-'} | Disponível: ${l.quantidade_disponivel}/${l.quantidade_total}`,
          );
      });
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async consultarPorId(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do livro: ');
      const livro = await this.service.buscarPorId(id);
      console.log(
        `[${livro.id}] ${livro.titulo} | Autor id: ${livro.autorId} | Ano: ${livro.anoPublicacao ?? '-'} | Disponível: ${livro.quantidadeDisponivel}/${livro.quantidadeTotal}`,
      );
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async atualizar(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do livro a atualizar: ');
      const titulo = await InputHelper.pergunta('Novo título: ');
      const autorId = await InputHelper.perguntaNumero('Novo id do autor: ');
      const anoTexto = await InputHelper.perguntaOpcional('Novo ano de publicação (opcional): ');
      const quantidadeTotal = await InputHelper.perguntaNumero('Nova quantidade total de exemplares: ');

      await this.service.atualizar(id, {
          titulo,
          autorId,
          anoPublicacao: anoTexto ? Number(anoTexto) : undefined,
          quantidadeTotal,
          quantidadeDisponivel: 0, // recalculado no service
      });
      console.log('Livro atualizado com sucesso!');
    } catch (error) {
      this.tratarErro(error);
    }
  }

  public async remover(): Promise<void> {
    try {
      const id = await InputHelper.perguntaNumero('Informe o id do livro a remover: ');
      await this.service.remover(id);
      console.log('Livro removido com sucesso!');
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

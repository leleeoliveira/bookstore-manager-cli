import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

/**
 * Classe utilitária responsável por concentrar a leitura de dados
 * digitados pelo usuário no terminal (CLI).
 */
export class InputHelper {
  private static rl = readline.createInterface({ input, output });

  public static async pergunta(mensagem: string): Promise<string> {
    const resposta = await this.rl.question(mensagem);
    return resposta.trim();
  }

  public static async perguntaNumero(mensagem: string): Promise<number> {
    const resposta = await this.pergunta(mensagem);
    const numero = Number(resposta);
    if (isNaN(numero)) {
      console.log('Valor inválido, considerando 0.');
      return 0;
    }
    return numero;
  }

  public static async perguntaOpcional(mensagem: string): Promise<string | undefined> {
    const resposta = await this.pergunta(mensagem);
    return resposta.length > 0 ? resposta : undefined;
  }

  public static fechar(): void {
    this.rl.close();
  }
}

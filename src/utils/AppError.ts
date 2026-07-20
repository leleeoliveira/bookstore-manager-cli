/**
 * Erro customizado para representar falhas de regra de negócio,
 * permitindo mensagens claras ao usuário sem interromper a aplicação (RF13, RF15).
 */
export class AppError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'AppError';
  }
}

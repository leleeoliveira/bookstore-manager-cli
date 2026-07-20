/**
 * Funções auxiliares de validação reutilizadas pelas camadas de serviço (RF13, RNF04).
 */
export class Validators {
  public static textoNaoVazio(texto: string): boolean {
    return typeof texto === 'string' && texto.trim().length > 0;
  }

  public static emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  public static numeroPositivo(valor: number): boolean {
    return typeof valor === 'number' && !isNaN(valor) && valor > 0;
  }

  public static formatarData(data: Date | null | undefined): string {
    if (!data) return '-';
    return new Date(data).toLocaleString('pt-BR');
  }
}

import { RelatorioService } from '../services/RelatorioService';

/**
 * Camada responsável por exibir os relatórios gerenciais no terminal (RF18).
 */
export class RelatorioController {
  private service = new RelatorioService();

  public async livrosDisponiveis(): Promise<void> {
    const dados = await this.service.livrosDisponiveis();
    console.log('\n--- Livros Disponíveis ---');
    if (dados.length === 0) {
      console.log('Nenhum livro disponível no momento.');
      return;
    }
    dados.forEach((l) => console.log(`[${l.id}] ${l.titulo} - ${l.autor} (${l.quantidade_disponivel} disponíveis)`));
  }

  public async livrosEmprestados(): Promise<void> {
    const dados = await this.service.livrosEmprestados();
    console.log('\n--- Livros Emprestados ---');
    if (dados.length === 0) {
      console.log('Nenhum livro emprestado no momento.');
      return;
    }
    dados.forEach((l) =>
      console.log(`[${l.id}] ${l.titulo} - Cliente: ${l.cliente} (desde ${new Date(l.data_emprestimo).toLocaleDateString('pt-BR')})`),
    );
  }

  public async livrosCadastradosPorAutor(): Promise<void> {
    const dados = await this.service.livrosCadastradosPorAutor();
    console.log('\n--- Livros Cadastrados por Autor ---');
    dados.forEach((d) => console.log(`${d.autor}: ${d.total_livros} livro(s)`));
  }

  public async quantidadeEmprestimosPorLivro(): Promise<void> {
    const dados = await this.service.quantidadeEmprestimosPorLivro(10);
    console.log('\n--- Quantidade de Empréstimos por Livro (Top 10) ---');
    dados.forEach((d) => console.log(`${d.titulo}: ${d.total_emprestimos} empréstimo(s)`));
  }

  public async clientesComEmprestimosAtivos(): Promise<void> {
    const dados = await this.service.clientesComEmprestimosAtivos();
    console.log('\n--- Clientes com Empréstimos Ativos ---');
    if (dados.length === 0) {
      console.log('Nenhum cliente com empréstimos ativos no momento.');
      return;
    }
    dados.forEach((d) => console.log(`${d.nome} (${d.email}): ${d.emprestimos_ativos} empréstimo(s) ativo(s)`));
  }
}

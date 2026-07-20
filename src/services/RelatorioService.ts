import { pool } from '../database/connection';

/**
 * Camada de relatórios gerenciais, construída a partir de consultas SQL
 * relacionais utilizando JOIN, GROUP BY, ORDER BY, LIMIT e funções de
 * agregação (RF17, RF18).
 */
export class RelatorioService {
  /** Livros que possuem exemplares disponíveis para empréstimo. */
  public async livrosDisponiveis(): Promise<any[]> {
    const resultado = await pool.query(
      `SELECT l.id, l.titulo, a.nome AS autor, l.quantidade_disponivel
      FROM livros l
      INNER JOIN autores a ON a.id = l.autor_id
      WHERE l.quantidade_disponivel > 0
      ORDER BY l.titulo ASC`,
    );
    return resultado.rows;
  }

  /** Livros que estão atualmente emprestados (com empréstimo ativo). */
  public async livrosEmprestados(): Promise<any[]> {
    const resultado = await pool.query(
      `SELECT l.id, l.titulo, c.nome AS cliente, e.data_emprestimo
      FROM emprestimos e
      INNER JOIN livros l ON l.id = e.livro_id
      INNER JOIN clientes c ON c.id = e.cliente_id
      WHERE e.status = 'ativo'
      ORDER BY e.data_emprestimo ASC`,
    );
    return resultado.rows;
  }

  /** Quantidade de livros cadastrados por autor (GROUP BY + agregação). */
  public async livrosCadastradosPorAutor(): Promise<any[]> {
    const resultado = await pool.query(
      `SELECT a.nome AS autor, COUNT(l.id) AS total_livros
      FROM autores a
      LEFT JOIN livros l ON l.autor_id = a.id
      GROUP BY a.nome
      ORDER BY total_livros DESC`,
    );
    return resultado.rows;
  }

  /** Quantidade de empréstimos por livro, do mais emprestado ao menos (LIMIT + agregação). */
  public async quantidadeEmprestimosPorLivro(limite: number = 10): Promise<any[]> {
    const resultado = await pool.query(
      `SELECT l.titulo, COUNT(e.id) AS total_emprestimos
      FROM livros l
      LEFT JOIN emprestimos e ON e.livro_id = l.id
      GROUP BY l.titulo
      ORDER BY total_emprestimos DESC
      LIMIT $1`,
      [limite],
    );
    return resultado.rows;
  }

  /** Clientes que possuem empréstimos ativos no momento. */
  public async clientesComEmprestimosAtivos(): Promise<any[]> {
    const resultado = await pool.query(
      `SELECT c.nome, c.email, COUNT(e.id) AS emprestimos_ativos
      FROM clientes c
      INNER JOIN emprestimos e ON e.cliente_id = c.id
      WHERE e.status = 'ativo'
      GROUP BY c.nome, c.email
      ORDER BY emprestimos_ativos DESC`,
    );
    return resultado.rows;
  }
}

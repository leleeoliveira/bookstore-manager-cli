import { pool } from '../database/connection';
import { Emprestimo, IEmprestimoDetalhado } from '../models/Emprestimo';

/**
 * Camada exclusivamente responsável pela comunicação com o PostgreSQL
 * para a entidade Emprestimo (RF10, RF11, RF12, RF16, RF17).
 */
export class EmprestimoRepository {
  public async criar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const resultado = await pool.query(
      `INSERT INTO emprestimos (livro_id, cliente_id, data_emprestimo, status)
      VALUES ($1, $2, NOW(), 'ativo')
      RETURNING id, livro_id, cliente_id, data_emprestimo, data_devolucao, status`,
      [livroId, clienteId],
    );
    const linha = resultado.rows[0];
    return new Emprestimo(
      linha.livro_id,
      linha.cliente_id,
      linha.status,
      linha.data_emprestimo,
      linha.data_devolucao,
      linha.id,
    );
  }

  public async buscarPorId(id: number): Promise<Emprestimo | null> {
    const resultado = await pool.query(
      'SELECT id, livro_id, cliente_id, data_emprestimo, data_devolucao, status FROM emprestimos WHERE id = $1',
      [id],
    );
    if (resultado.rowCount === 0) return null;
    const linha = resultado.rows[0];
    return new Emprestimo(
      linha.livro_id,
      linha.cliente_id,
      linha.status,
      linha.data_emprestimo,
      linha.data_devolucao,
      linha.id,
    );
  }

  public async registrarDevolucao(id: number): Promise<void> {
    await pool.query(
      `UPDATE emprestimos SET data_devolucao = NOW(), status = 'finalizado' WHERE id = $1`,
      [id],
    );
  }

  /**
   * Lista todos os empréstimos com informações do livro e do cliente,
   * utilizando JOIN entre as três tabelas (RF12, RF17).
   */
  public async listarDetalhados(): Promise<IEmprestimoDetalhado[]> {
    const resultado = await pool.query(
      `SELECT e.id, l.titulo AS livro_titulo, c.nome AS cliente_nome,
      e.data_emprestimo, e.data_devolucao, e.status
      FROM emprestimos e
      INNER JOIN livros l ON l.id = e.livro_id
      INNER JOIN clientes c ON c.id = e.cliente_id
      ORDER BY e.data_emprestimo DESC`,
    );
    return resultado.rows;
  }
}

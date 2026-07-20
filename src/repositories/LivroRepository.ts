import { pool } from '../database/connection';
import { Livro, ILivro } from '../models/Livro';

/**
 * Camada exclusivamente responsável pela comunicação com o PostgreSQL
 * para a entidade Livro (RF08, RF16, RF17).
 */
export class LivroRepository {
  private mapear(linha: any): Livro {
    return new Livro(
      linha.titulo,
      linha.autor_id,
      linha.quantidade_total,
      linha.quantidade_disponivel,
      linha.ano_publicacao ?? undefined,
      linha.id,
    );
  }

  public async criar(livro: ILivro): Promise<Livro> {
    const resultado = await pool.query(
      `INSERT INTO livros (titulo, autor_id, ano_publicacao, quantidade_total, quantidade_disponivel)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, titulo, autor_id, ano_publicacao, quantidade_total, quantidade_disponivel`,
      [livro.titulo, livro.autorId, livro.anoPublicacao ?? null, livro.quantidadeTotal, livro.quantidadeDisponivel],
    );
    return this.mapear(resultado.rows[0]);
  }

  public async listarTodos(): Promise<Livro[]> {
    const resultado = await pool.query(
      'SELECT id, titulo, autor_id, ano_publicacao, quantidade_total, quantidade_disponivel FROM livros ORDER BY titulo ASC',
    );
    return resultado.rows.map((linha) => this.mapear(linha));
  }

  public async listarComNomeAutor(): Promise<any[]> {
    // Consulta relacional utilizando INNER JOIN (RF17)
    const resultado = await pool.query(
      `SELECT l.id, l.titulo, a.nome AS autor_nome, l.ano_publicacao,
      l.quantidade_total, l.quantidade_disponivel
      FROM livros l
      INNER JOIN autores a ON a.id = l.autor_id
      ORDER BY l.titulo ASC`,
    );
    return resultado.rows;
  }

  public async buscarPorId(id: number): Promise<Livro | null> {
    const resultado = await pool.query(
      'SELECT id, titulo, autor_id, ano_publicacao, quantidade_total, quantidade_disponivel FROM livros WHERE id = $1',
      [id],
    );
    if (resultado.rowCount === 0) return null;
    return this.mapear(resultado.rows[0]);
  }

  public async atualizar(id: number, livro: ILivro): Promise<Livro | null> {
    const resultado = await pool.query(
      `UPDATE livros
      SET titulo = $1, autor_id = $2, ano_publicacao = $3, quantidade_total = $4, quantidade_disponivel = $5
      WHERE id = $6
      RETURNING id, titulo, autor_id, ano_publicacao, quantidade_total, quantidade_disponivel`,
      [livro.titulo, livro.autorId, livro.anoPublicacao ?? null, livro.quantidadeTotal, livro.quantidadeDisponivel, id],
    );
    if (resultado.rowCount === 0) return null;
    return this.mapear(resultado.rows[0]);
  }

  public async remover(id: number): Promise<boolean> {
    const resultado = await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    return (resultado.rowCount ?? 0) > 0;
  }

  public async atualizarQuantidadeDisponivel(id: number, quantidade: number): Promise<void> {
    await pool.query('UPDATE livros SET quantidade_disponivel = $1 WHERE id = $2', [quantidade, id]);
  }

  public async possuiEmprestimosVinculados(id: number): Promise<boolean> {
    const resultado = await pool.query('SELECT 1 FROM emprestimos WHERE livro_id = $1 LIMIT 1', [id]);
    return (resultado.rowCount ?? 0) > 0;
  }
}

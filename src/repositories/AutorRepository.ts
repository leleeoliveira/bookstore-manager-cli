import { pool } from '../database/connection';
import { Autor, IAutor } from '../models/Autor';

/**
 * Camada exclusivamente responsável pela comunicação com o PostgreSQL
 * para a entidade Autor (RF07, RF16).
 */
export class AutorRepository {
  public async criar(autor: IAutor): Promise<Autor> {
    const resultado = await pool.query(
      'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING id, nome, nacionalidade',
      [autor.nome, autor.nacionalidade ?? null],
    );
    const linha = resultado.rows[0];
    return new Autor(linha.nome, linha.nacionalidade, linha.id);
  }

  public async listarTodos(): Promise<Autor[]> {
    const resultado = await pool.query('SELECT id, nome, nacionalidade FROM autores ORDER BY nome ASC');
    return resultado.rows.map((linha) => new Autor(linha.nome, linha.nacionalidade, linha.id));
  }

  public async buscarPorId(id: number): Promise<Autor | null> {
    const resultado = await pool.query(
      'SELECT id, nome, nacionalidade FROM autores WHERE id = $1',
      [id],
    );
    if (resultado.rowCount === 0) return null;
    const linha = resultado.rows[0];
    return new Autor(linha.nome, linha.nacionalidade, linha.id);
  }

  public async atualizar(id: number, autor: IAutor): Promise<Autor | null> {
    const resultado = await pool.query(
      'UPDATE autores SET nome = $1, nacionalidade = $2 WHERE id = $3 RETURNING id, nome, nacionalidade',
      [autor.nome, autor.nacionalidade ?? null, id],
    );
    if (resultado.rowCount === 0) return null;
    const linha = resultado.rows[0];
    return new Autor(linha.nome, linha.nacionalidade, linha.id);
  }

  public async remover(id: number): Promise<boolean> {
    const resultado = await pool.query('DELETE FROM autores WHERE id = $1', [id]);
    return (resultado.rowCount ?? 0) > 0;
  }

  public async possuiLivrosVinculados(id: number): Promise<boolean> {
    const resultado = await pool.query('SELECT 1 FROM livros WHERE autor_id = $1 LIMIT 1', [id]);
    return (resultado.rowCount ?? 0) > 0;
  }
}

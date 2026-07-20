import { pool } from '../database/connection';
import { Cliente, ICliente } from '../models/Cliente';

/**
 * Camada exclusivamente responsável pela comunicação com o PostgreSQL
 * para a entidade Cliente (RF09, RF16).
 */
export class ClienteRepository {
  private mapear(linha: any): Cliente {
    return new Cliente(linha.nome, linha.email, linha.telefone ?? undefined, linha.id);
  }

  public async criar(cliente: ICliente): Promise<Cliente> {
    const resultado = await pool.query(
      'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING id, nome, email, telefone',
      [cliente.nome, cliente.email, cliente.telefone ?? null],
    );
    return this.mapear(resultado.rows[0]);
  }

  public async listarTodos(): Promise<Cliente[]> {
    const resultado = await pool.query('SELECT id, nome, email, telefone FROM clientes ORDER BY nome ASC');
    return resultado.rows.map((linha) => this.mapear(linha));
  }

  public async buscarPorId(id: number): Promise<Cliente | null> {
    const resultado = await pool.query('SELECT id, nome, email, telefone FROM clientes WHERE id = $1', [id]);
    if (resultado.rowCount === 0) return null;
    return this.mapear(resultado.rows[0]);
  }

  public async buscarPorEmail(email: string): Promise<Cliente | null> {
    const resultado = await pool.query('SELECT id, nome, email, telefone FROM clientes WHERE email = $1', [email]);
    if (resultado.rowCount === 0) return null;
    return this.mapear(resultado.rows[0]);
  }

  public async atualizar(id: number, cliente: ICliente): Promise<Cliente | null> {
    const resultado = await pool.query(
      'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING id, nome, email, telefone',
      [cliente.nome, cliente.email, cliente.telefone ?? null, id],
    );
    if (resultado.rowCount === 0) return null;
    return this.mapear(resultado.rows[0]);
  }

  public async remover(id: number): Promise<boolean> {
    const resultado = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    return (resultado.rowCount ?? 0) > 0;
  }

  public async possuiEmprestimosVinculados(id: number): Promise<boolean> {
    const resultado = await pool.query('SELECT 1 FROM emprestimos WHERE cliente_id = $1 LIMIT 1', [id]);
    return (resultado.rowCount ?? 0) > 0;
  }
}

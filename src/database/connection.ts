import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Pool de conexões com o PostgreSQL.
 * As credenciais são lidas do arquivo .env (RF02).
 */
export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

/**
 * Testa a conexão com o banco de dados.
 * Utilizado na inicialização da aplicação (RF21).
 */
export async function testarConexao(): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', (error as Error).message);
    throw error;
  }
}

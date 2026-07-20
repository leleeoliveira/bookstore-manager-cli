import { testarConexao, pool } from './database/connection';
import { MainMenu } from './menus/MainMenu';

/**
 * Ponto de entrada da aplicação BookStore Manager CLI.
 * Responsável por iniciar a aplicação, estabelecer a conexão com o
 * banco de dados e iniciar o menu principal do sistema (RF21).
 */
async function main(): Promise<void> {
  console.log('Iniciando BookStore Manager CLI...\n');

  try {
    await testarConexao();
  } catch (error) {
    console.error('Não foi possível iniciar a aplicação sem conexão com o banco de dados.');
    process.exit(1);
  }

  const menu = new MainMenu();
  await menu.iniciar();

  await pool.end();
  process.exit(0);
}

main().catch((error) => {
    console.error('Erro fatal na aplicação:', error);
    process.exit(1);
});

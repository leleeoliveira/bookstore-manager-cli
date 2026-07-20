import { InputHelper } from '../utils/InputHelper';
import { AutorController } from '../controllers/AutorController';
import { LivroController } from '../controllers/LivroController';
import { ClienteController } from '../controllers/ClienteController';
import { EmprestimoController } from '../controllers/EmprestimoController';
import { RelatorioController } from '../controllers/RelatorioController';

/**
 * Responsável pela organização e navegação dos menus da aplicação (RF06).
 */
export class MainMenu {
  private autorController = new AutorController();
  private livroController = new LivroController();
  private clienteController = new ClienteController();
  private emprestimoController = new EmprestimoController();
  private relatorioController = new RelatorioController();

  public async iniciar(): Promise<void> {
    let continuar = true;

    while (continuar) {
      console.log('\n============================================');
      console.log('          BOOKSTORE MANAGER CLI');
      console.log('============================================');
      console.log('1 - Autores');
      console.log('2 - Livros');
      console.log('3 - Clientes');
      console.log('4 - Empréstimos');
      console.log('5 - Relatórios');
      console.log('0 - Encerrar aplicação');

      const opcao = await InputHelper.pergunta('\nEscolha uma opção: ');

      switch (opcao) {
        case '1':
        await this.menuAutores();
        break;
        case '2':
        await this.menuLivros();
        break;
        case '3':
        await this.menuClientes();
        break;
        case '4':
        await this.menuEmprestimos();
        break;
        case '5':
        await this.menuRelatorios();
        break;
        case '0':
        continuar = false;
        console.log('Encerrando a aplicação. Até logo!');
        break;
        default:
        console.log('Opção inválida. Tente novamente.');
      }
    }

    InputHelper.fechar();
  }

  private async menuAutores(): Promise<void> {
    let voltar = false;
    while (!voltar) {
      console.log('\n--- Menu Autores ---');
      console.log('1 - Cadastrar autor');
      console.log('2 - Listar autores');
      console.log('3 - Consultar autor por id');
      console.log('4 - Atualizar autor');
      console.log('5 - Remover autor');
      console.log('0 - Voltar');

      const opcao = await InputHelper.pergunta('Escolha uma opção: ');
      switch (opcao) {
        case '1':
        await this.autorController.cadastrar();
        break;
        case '2':
        await this.autorController.listar();
        break;
        case '3':
        await this.autorController.consultarPorId();
        break;
        case '4':
        await this.autorController.atualizar();
        break;
        case '5':
        await this.autorController.remover();
        break;
        case '0':
        voltar = true;
        break;
        default:
        console.log('Opção inválida.');
      }
    }
  }

  private async menuLivros(): Promise<void> {
    let voltar = false;
    while (!voltar) {
      console.log('\n--- Menu Livros ---');
      console.log('1 - Cadastrar livro');
      console.log('2 - Listar livros');
      console.log('3 - Consultar livro por id');
      console.log('4 - Atualizar livro');
      console.log('5 - Remover livro');
      console.log('0 - Voltar');

      const opcao = await InputHelper.pergunta('Escolha uma opção: ');
      switch (opcao) {
        case '1':
        await this.livroController.cadastrar();
        break;
        case '2':
        await this.livroController.listar();
        break;
        case '3':
        await this.livroController.consultarPorId();
        break;
        case '4':
        await this.livroController.atualizar();
        break;
        case '5':
        await this.livroController.remover();
        break;
        case '0':
        voltar = true;
        break;
        default:
        console.log('Opção inválida.');
      }
    }
  }

  private async menuClientes(): Promise<void> {
    let voltar = false;
    while (!voltar) {
      console.log('\n--- Menu Clientes ---');
      console.log('1 - Cadastrar cliente');
      console.log('2 - Listar clientes');
      console.log('3 - Consultar cliente por id');
      console.log('4 - Atualizar cliente');
      console.log('5 - Remover cliente');
      console.log('0 - Voltar');

      const opcao = await InputHelper.pergunta('Escolha uma opção: ');
      switch (opcao) {
        case '1':
        await this.clienteController.cadastrar();
        break;
        case '2':
        await this.clienteController.listar();
        break;
        case '3':
        await this.clienteController.consultarPorId();
        break;
        case '4':
        await this.clienteController.atualizar();
        break;
        case '5':
        await this.clienteController.remover();
        break;
        case '0':
        voltar = true;
        break;
        default:
        console.log('Opção inválida.');
      }
    }
  }

  private async menuEmprestimos(): Promise<void> {
    let voltar = false;
    while (!voltar) {
      console.log('\n--- Menu Empréstimos ---');
      console.log('1 - Realizar empréstimo');
      console.log('2 - Registrar devolução');
      console.log('3 - Listar empréstimos');
      console.log('0 - Voltar');

      const opcao = await InputHelper.pergunta('Escolha uma opção: ');
      switch (opcao) {
        case '1':
        await this.emprestimoController.realizarEmprestimo();
        break;
        case '2':
        await this.emprestimoController.registrarDevolucao();
        break;
        case '3':
        await this.emprestimoController.listar();
        break;
        case '0':
        voltar = true;
        break;
        default:
        console.log('Opção inválida.');
      }
    }
  }

  private async menuRelatorios(): Promise<void> {
    let voltar = false;
    while (!voltar) {
      console.log('\n--- Menu Relatórios ---');
      console.log('1 - Livros disponíveis');
      console.log('2 - Livros emprestados');
      console.log('3 - Livros cadastrados por autor');
      console.log('4 - Quantidade de empréstimos por livro');
      console.log('5 - Clientes com empréstimos ativos');
      console.log('0 - Voltar');

      const opcao = await InputHelper.pergunta('Escolha uma opção: ');
      switch (opcao) {
        case '1':
        await this.relatorioController.livrosDisponiveis();
        break;
        case '2':
        await this.relatorioController.livrosEmprestados();
        break;
        case '3':
        await this.relatorioController.livrosCadastradosPorAutor();
        break;
        case '4':
        await this.relatorioController.quantidadeEmprestimosPorLivro();
        break;
        case '5':
        await this.relatorioController.clientesComEmprestimosAtivos();
        break;
        case '0':
        voltar = true;
        break;
        default:
        console.log('Opção inválida.');
      }
    }
  }
}

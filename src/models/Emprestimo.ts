export type StatusEmprestimo = 'ativo' | 'finalizado';

/**
 * Interface que representa a entidade Emprestimo no banco de dados.
 */
export interface IEmprestimo {
  id?: number;
  livroId: number;
  clienteId: number;
  dataEmprestimo?: Date;
  dataDevolucao?: Date | null;
  status?: StatusEmprestimo;
}

/**
 * Classe que representa um Empréstimo de livro para um cliente.
 */
export class Emprestimo implements IEmprestimo {
  private _id?: number;
  private _livroId: number;
  private _clienteId: number;
  private _dataEmprestimo?: Date;
  private _dataDevolucao?: Date | null;
  private _status: StatusEmprestimo;

  constructor(
    livroId: number,
    clienteId: number,
    status: StatusEmprestimo = 'ativo',
    dataEmprestimo?: Date,
    dataDevolucao?: Date | null,
    id?: number,
  ) {
    this._livroId = livroId;
    this._clienteId = clienteId;
    this._status = status;
    this._dataEmprestimo = dataEmprestimo;
    this._dataDevolucao = dataDevolucao;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get livroId(): number {
    return this._livroId;
  }

  public get clienteId(): number {
    return this._clienteId;
  }

  public get dataEmprestimo(): Date | undefined {
    return this._dataEmprestimo;
  }

  public get dataDevolucao(): Date | null | undefined {
    return this._dataDevolucao;
  }

  public set dataDevolucao(valor: Date | null | undefined) {
    this._dataDevolucao = valor;
  }

  public get status(): StatusEmprestimo {
    return this._status;
  }

  public set status(valor: StatusEmprestimo) {
    this._status = valor;
  }
}

/**
 * Interface para representar o resultado de uma consulta de empréstimo
 * já com os dados relacionados de livro e cliente (RF12, RF17).
 */
export interface IEmprestimoDetalhado {
  id: number;
  livro_titulo: string;
  cliente_nome: string;
  data_emprestimo: Date;
  data_devolucao: Date | null;
  status: StatusEmprestimo;
}

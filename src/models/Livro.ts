/**
 * Interface que representa a entidade Livro no banco de dados.
 */
export interface ILivro {
  id?: number;
  titulo: string;
  autorId: number;
  anoPublicacao?: number;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
}

/**
 * Classe que representa um Livro da livraria.
 */
export class Livro implements ILivro {
  private _id?: number;
  private _titulo: string;
  private _autorId: number;
  private _anoPublicacao?: number;
  private _quantidadeTotal: number;
  private _quantidadeDisponivel: number;

  constructor(
    titulo: string,
    autorId: number,
    quantidadeTotal: number,
    quantidadeDisponivel: number,
    anoPublicacao?: number,
    id?: number,
  ) {
    this._titulo = titulo;
    this._autorId = autorId;
    this._quantidadeTotal = quantidadeTotal;
    this._quantidadeDisponivel = quantidadeDisponivel;
    this._anoPublicacao = anoPublicacao;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get titulo(): string {
    return this._titulo;
  }

  public set titulo(valor: string) {
    this._titulo = valor;
  }

  public get autorId(): number {
    return this._autorId;
  }

  public set autorId(valor: number) {
    this._autorId = valor;
  }

  public get anoPublicacao(): number | undefined {
    return this._anoPublicacao;
  }

  public set anoPublicacao(valor: number | undefined) {
    this._anoPublicacao = valor;
  }

  public get quantidadeTotal(): number {
    return this._quantidadeTotal;
  }

  public set quantidadeTotal(valor: number) {
    this._quantidadeTotal = valor;
  }

  public get quantidadeDisponivel(): number {
    return this._quantidadeDisponivel;
  }

  public set quantidadeDisponivel(valor: number) {
    this._quantidadeDisponivel = valor;
  }
}

/**
 * Interface que representa a entidade Autor no banco de dados.
 */
export interface IAutor {
  id?: number;
  nome: string;
  nacionalidade?: string;
}

/**
 * Classe que representa um Autor da livraria.
 */
export class Autor implements IAutor {
  private _id?: number;
  private _nome: string;
  private _nacionalidade?: string;

  constructor(nome: string, nacionalidade?: string, id?: number) {
    this._nome = nome;
    this._nacionalidade = nacionalidade;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public set nome(valor: string) {
    this._nome = valor;
  }

  public get nacionalidade(): string | undefined {
    return this._nacionalidade;
  }

  public set nacionalidade(valor: string | undefined) {
    this._nacionalidade = valor;
  }
}

/**
 * Interface que representa a entidade Cliente no banco de dados.
 */
export interface ICliente {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
}

/**
 * Classe que representa um Cliente da livraria.
 */
export class Cliente implements ICliente {
  private _id?: number;
  private _nome: string;
  private _email: string;
  private _telefone?: string;

  constructor(nome: string, email: string, telefone?: string, id?: number) {
    this._nome = nome;
    this._email = email;
    this._telefone = telefone;
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

  public get email(): string {
    return this._email;
  }

  public set email(valor: string) {
    this._email = valor;
  }

  public get telefone(): string | undefined {
    return this._telefone;
  }

  public set telefone(valor: string | undefined) {
    this._telefone = valor;
  }
}

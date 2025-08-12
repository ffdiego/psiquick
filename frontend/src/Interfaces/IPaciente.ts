import type { IContato } from "./IContato";

export interface IPaciente {
    Id: number,
    Nome: string,
    DataNascimento?: Date,
    DataPrimeiraConsulta?: Date,
    Contatos: IContato,
    Problemas: number[],
}
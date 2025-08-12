import type { IProblema } from "./IProblemasEMetas";

export interface IPaciente {
    Id: number,
    Nome: string,
    Email?: string,
    DataNascimento?: Date,
    Problemas: number[],
}
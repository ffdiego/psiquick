import type { IPaciente } from "../Interfaces/IPaciente";
import type { IProblema } from "../Interfaces/IProblemasEMetas";


export const PacientesMock: IPaciente[] = [
    {
        Id: 1,
        Nome: "Luiz Miguel",
        Problemas: [5, 6]
    },
    {
        Id: 2,
        Nome: "Diego Fernandes",
        Problemas: [777]
    },
    {
        Id: 3,
        Nome: "Leonardo Bruno",
        Problemas: [9]
    },
]
import type { IContato } from "../Interfaces/IContato";
import type { IPaciente } from "../Interfaces/IPaciente";

const contatoMock: IContato = {
    Email: 'meumicomicomeu@gmail.com',
    Telefone: 679_9999_9999
}

export const PacientesMock: IPaciente[] = [
    {
        Id: 1,
        Nome: "Luiz Miguel",
        DataNascimento: new Date("1994-08-12T04:00:00"),
        DataPrimeiraConsulta: new Date("2024-01-12T04:00:00"),
        Contatos: contatoMock,
        Problemas: [5, 6]
    },
    {
        Id: 2,
        Nome: "Diego Fernandes",
        DataNascimento: new Date("1994-08-12T04:00:00"),
        Contatos: contatoMock,
        Problemas: [777]
    },
    {
        Id: 3,
        Nome: "Leonardo Bruno",
        DataNascimento: new Date("1994-08-12T04:00:00"),
        Contatos: contatoMock,
        Problemas: [9]
    },
]
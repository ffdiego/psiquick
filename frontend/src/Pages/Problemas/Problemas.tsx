import { Skeleton, Table } from "@mantine/core";
import { PacientesMock } from "../../Mocks/PacientesMock";
import type { IPaciente } from "../../Interfaces/IPaciente";
import { useEffect, useState } from "react";
import classes from './Pacientes.module.css';
import { useNavigate } from "react-router";
import { ProblemasMock } from "../../Mocks/ProblemasMock";
import type { IProblema } from "../../Interfaces/IProblemasEMetas";

export default function Problemas() {
    const [problemas, setProblemas] = useState<IProblema[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setProblemas(ProblemasMock);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [])

    function listaProblemas(paciente: IPaciente): string {
        if (paciente.Problemas.length <= 0)
            return "";

        return paciente.Problemas.map(p => ProblemasMock.find(pm => pm.Id == p)?.Nome).join(", ");
    }

    return (
        <>
            <Table
                highlightOnHover={problemas != null}
                tabularNums>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nome</Table.Th>
                        <Table.Th>Código DSM</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        problemas?.map(problema =>
                            <Table.Tr key={problema.Id} style={{cursor: 'pointer'}} onClick={() => navigate(problema.Id.toString(), { relative: 'path' })}>
                                <Table.Td>{problema.Nome}</Table.Td>
                                <Table.Td>{problema.CodDSM}</Table.Td>
                            </Table.Tr>
                        ) ||
                        [0, 1, 2, 3, 4, 5, 6, 7].map(id =>
                            <Table.Tr key={id}>
                                <Table.Td>
                                    <Skeleton height={24} />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={24} />
                                </Table.Td>
                                <Table.Td>
                                    <Skeleton height={24} />
                                </Table.Td>
                            </Table.Tr>
                        )
                    }
                </Table.Tbody>
            </Table>
        </>
    );
}
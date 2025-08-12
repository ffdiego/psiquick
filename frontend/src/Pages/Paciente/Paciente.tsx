import { Tabs } from "@mantine/core";
import { MdAppRegistration, MdDashboard, MdPsychology } from "react-icons/md";
import { PacienteCadastro } from "./PacienteCadastro/PacienteCadastro";
import { useNavigate, useParams } from "react-router";
import type { IPaciente } from "../../Interfaces/IPaciente";
import { useEffect, useState } from "react";
import { PacientesMock } from "../../Mocks/PacientesMock";
import { LuFiles } from "react-icons/lu";
import { PacienteOverview } from "./PacienteOverview/PacienteOverview";
import { SessoesMock } from "../../Mocks/SessoesMock";

export function Paciente() {
    const { id: idPaciente } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [paciente, setPaciente] = useState<IPaciente>();

    useEffect(() => {
        const pacienteFetch = PacientesMock.find(p => p.Id == Number(idPaciente));
        pacienteFetch 
            ? setPaciente(pacienteFetch)
            : navigate("..", { relative: "path" });
    }, []);

    if (!paciente) {
        return <p>Paciente não encontrado.</p>
    }

    return <>
        <Tabs variant="pills" defaultValue="overview">
            <Tabs.List mb={8}>
                <Tabs.Tab value="overview" leftSection={<MdDashboard size={24} />}>
                    Overview
                </Tabs.Tab>
                <Tabs.Tab value="cadastro" leftSection={<MdAppRegistration size={24} />}>
                    Cadastro
                </Tabs.Tab>
                <Tabs.Tab value="sessoes" leftSection={<MdPsychology size={24} />}>
                    Sessões
                </Tabs.Tab>
                <Tabs.Tab value="documentos" leftSection={<LuFiles size={24} />}>
                    Documentos
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
                <PacienteOverview paciente={paciente} sessoes={SessoesMock} />
            </Tabs.Panel>
            <Tabs.Panel value="cadastro">
                <PacienteCadastro paciente={paciente} setPaciente={setPaciente} />
            </Tabs.Panel>
            <Tabs.Panel value="sessoes">
                <p>sessoes</p>
            </Tabs.Panel>
            <Tabs.Panel value="documentos">
                <p>documentos</p>
            </Tabs.Panel>
        </Tabs>
    </>
}
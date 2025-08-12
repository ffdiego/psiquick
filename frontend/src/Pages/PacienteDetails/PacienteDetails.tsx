import { useEffect, useState } from "react";
import type { IPaciente } from "../../Interfaces/IPaciente";
import { useNavigate, useParams } from "react-router";
import { PacientesMock } from "../../Mocks/PacientesMock";
import { Button, Fieldset, MultiSelect, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates'
import { ProblemasMock } from "../../Mocks/ProblemasMock";

export function PacienteDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [edicaoHabilitada, setEdicaoHabilitada] = useState<boolean>(false);
    const [pacienteBD, setPacienteBD] = useState<IPaciente | null>(null);

    const form = useForm<IPaciente>({
        mode: 'uncontrolled',
        validate: {
            Nome: hasLength({ min: 3 }, 'Must be at least 3 characters'),
            Email: (value) => value ? isEmail('Invalid email')(value) : null,
        },
    });

    function onSubmit(paciente: IPaciente) {
        console.log(paciente);
        setPacienteBD(paciente);
    }

    function resetForm() {
        if (!pacienteBD) return; 

        form.setValues(pacienteBD);
        form.resetDirty();
        setEdicaoHabilitada(false);
    }

    useEffect(() => {
        const pacienteFetch = PacientesMock.find(p => p.Id == Number(id));
        pacienteFetch 
            ? setPacienteBD(pacienteFetch)
            : navigate("..", { relative: "path" });
    }, [])

    useEffect(resetForm, [pacienteBD]);

    if (!form.values.Nome) 
    {
        return <p>Paciente não encontrado!</p>
    }

    return <>
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Fieldset legend="Informações Pessoais">
                <TextInput readOnly={!edicaoHabilitada} withAsterisk label="Nome" {...form.getInputProps('Nome')} />
                <TextInput readOnly={!edicaoHabilitada} label="Email" {...form.getInputProps('Email')} />
                <DateInput
                    clearable
                    readOnly={!edicaoHabilitada}
                    label="Data de Nascimento"
                    placeholder="dd/mm/yyyy"
                    valueFormat="DD/MM/YYYY"
                    {...form.getInputProps('DataNascimento')}
                    />
            </Fieldset>
            <Fieldset legend="Queixas & Suspeitas">
            <MultiSelect 
                clearable
                searchable
                readOnly={!edicaoHabilitada}
                label="Queixas"
                data={ProblemasMock.map(p => ({value: String(p.Id), label: p.Nome}))} 
                value={form.getValues().Problemas.map(p => String(p))}
                onChange={selectedIds => form.setFieldValue('Problemas', 
                    selectedIds.map(ids => Number(ids)))}
                />
            </Fieldset>

            <Button variant="outline" m={0} disabled={edicaoHabilitada} onClick={() => setEdicaoHabilitada(true)}>Editar</Button>
            <Button disabled={!form.isDirty()} variant="filled" m={8} onClick={resetForm}>Reset</Button>
            <Button disabled={!form.isDirty()} ml={8} type="submit">Salvar</Button>
        </form>
    </>
}



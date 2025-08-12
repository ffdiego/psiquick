import { useEffect, useState } from "react";
import type { IPaciente } from "../../../Interfaces/IPaciente";
import { PacientesMock } from "../../../Mocks/PacientesMock";
import { Button, Fieldset, Flex, MultiSelect, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates'
import { ProblemasMock } from "../../../Mocks/ProblemasMock";
import { notifications } from "@mantine/notifications";

export function PacienteCadastro({ paciente, setPaciente }: { paciente: IPaciente, setPaciente: React.Dispatch<React.SetStateAction<IPaciente | undefined>> }) {
    const [edicaoHabilitada, setEdicaoHabilitada] = useState<boolean>(false);

    const form = useForm<IPaciente>({
        initialValues: paciente,
        mode: 'uncontrolled',
        validate: {
            Nome: hasLength({ min: 3 }, 'Must be at least 3 characters'),
            Email: (value) => value ? isEmail('Invalid email')(value) : null,
        },
    });

    function onSubmit(paciente: IPaciente) {
        console.log(paciente);
        setPaciente(paciente);
        notifications.show({
            title: 'Cadastro Atualizado',
            message: <>Dados do paciente <b>{paciente.Nome}</b> foram atualizados com sucesso!</>
        })
    }

    function resetForm() {
        form.setValues(paciente);
        form.resetDirty();
        setEdicaoHabilitada(false);
    }

    useEffect(resetForm, [paciente]);

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
                    data={ProblemasMock.map(p => ({ value: String(p.Id), label: p.Nome }))}
                    value={form.getValues().Problemas.map(p => String(p))}
                    onChange={selectedIds => form.setFieldValue('Problemas',
                        selectedIds.map(ids => Number(ids)))}
                />
            </Fieldset>

            <Flex direction='row' m={8} gap={8}>
                <Button variant="outline" disabled={edicaoHabilitada} onClick={() => setEdicaoHabilitada(true)}>Editar</Button>
                <Button variant="outline" disabled={!form.isDirty()} onClick={resetForm}>Reset</Button>
                <Button disabled={!form.isDirty()} ml={16} type="submit">Salvar</Button>
            </Flex>
        </form>
    </>
}



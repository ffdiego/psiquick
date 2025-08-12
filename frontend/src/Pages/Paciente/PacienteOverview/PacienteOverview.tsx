import { Anchor, Badge, Card, Divider, Grid, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type { IPaciente } from "../../../Interfaces/IPaciente";
import type { ISessao } from "../../../Interfaces/ISessao";
import dayjs from "dayjs";
import { differenceInYears } from "date-fns";
import type { ReactNode } from "react";
import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";

interface IInfoCard {
    label: string;
    value?: string;
    link?: string;
    icon?: ReactNode;
    colSpan?: number;
}

function InfoCardValueWrapper({ infoCard, children }: { infoCard: IInfoCard, children: ReactNode }) {
    if (infoCard.link && infoCard.value) {
        return <Anchor href={infoCard.link} target='_blank' underline='hover' c='inherit'>{children}</Anchor>
    }
    else {
        return children;
    }
}

export function PacienteOverview({ paciente, sessoes }: { paciente: IPaciente, sessoes: ISessao[] }) {
    const sessoesFeitas = sessoes.filter(s => s.status === 'feita');
    const sessoesAgendadas = sessoes.filter(s => s.status === 'agendada');
    const totalFaltam = sessoes.length - sessoesFeitas.length;
    const idade = paciente.DataNascimento ? differenceInYears(new Date(), new Date(paciente.DataNascimento)) : 0;

    const infoCards: IInfoCard[] = [
        { label: 'Nome', value: paciente.Nome, colSpan: 2 },
        { label: 'Idade', value: `${idade} anos` },
        { label: 'Plano de Saúde' },
        { label: 'Primeira consulta', value: paciente.DataPrimeiraConsulta?.toLocaleDateString() },
        { label: 'Email', value: paciente.Contatos.Email, link: `mailto:${paciente.Contatos.Email}`, icon: <MdOutlineEmail size={24} /> },
        { label: 'Número de Telefone', value: String(paciente.Contatos.Telefone), link: `https://wa.me/${paciente.Contatos.Telefone}`, icon: <MdWhatsapp size={24} /> },
    ];

    return (
        <Stack>
            <Title order={2}>Paciente</Title>

            <Grid gutter="sm">
                {infoCards.map((item) => (
                    <Grid.Col
                        key={item.label}
                        span={{ base: 12, sm: (item.colSpan ?? 1) * 6, md: (item.colSpan ?? 1) * 4 }}
                    >
                        <Card shadow="sm" padding="lg">
                            <Text size="sm" c="dimmed">
                                {item.label}
                            </Text>
                            <InfoCardValueWrapper infoCard={item}>
                                <Group gap="xs">
                                    {item.icon && item.icon}
                                    <Text fw={700} size="lg">
                                        {item.value ?? "Não informado"}
                                    </Text>
                                </Group>
                            </InfoCardValueWrapper>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>


            <Title order={2}>Resumo de Sessões</Title>
            <Group grow>
                <Card shadow="sm" padding="lg">
                    <Text size="sm" c="dimmed">Sessões Feitas</Text>
                    <Text fw={700} size="xl">{sessoesFeitas.length}</Text>
                </Card>

                <Card shadow="sm" padding="lg">
                    <Text size="sm" c="dimmed">Sessões Restantes</Text>
                    <Text fw={700} size="xl">{totalFaltam}</Text>
                </Card>

                <Card shadow="sm" padding="lg">
                    <Text size="sm" c="dimmed">Próximas Sessões</Text>
                    <Text fw={700} size="xl">{sessoesAgendadas.length}</Text>
                </Card>
            </Group>

            {/* Tabela de próximas sessões */}
            <Card shadow="sm" padding="lg">
                <Text fw={600} mb="sm">Próximas Sessões</Text>
                <Table highlightOnHover withTableBorder withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Data</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {sessoesAgendadas.length > 0 ? (
                            sessoesAgendadas.map(s => (
                                <Table.Tr key={s.id}>
                                    <Table.Td>{dayjs(s.data).format('DD/MM/YYYY HH:mm')}</Table.Td>
                                    <Table.Td>
                                        <Badge color="blue">{s.status}</Badge>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={2}>
                                    <Text c="dimmed" ta="center">Nenhuma sessão agendada</Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Card>
        </Stack>
    );
}
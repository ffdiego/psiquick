import { Badge, Card, Group, Stack, Table, Text, Title } from "@mantine/core";
import type { IPaciente } from "../../../Interfaces/IPaciente";
import type { ISessao } from "../../../Interfaces/ISessao";
import dayjs from "dayjs";

export function PacienteOverview({ paciente, sessoes }: { paciente: IPaciente, sessoes: ISessao[] }) {
    const sessoesFeitas = sessoes.filter(s => s.status === 'feita');
    const sessoesAgendadas = sessoes.filter(s => s.status === 'agendada');
    const totalFaltam = sessoes.length - sessoesFeitas.length;

    return (
        <Stack>
            <Title order={2}>Resumo do Paciente</Title>
            
            {/* Cards de estatísticas */}
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
                <Table highlightOnHover withTableBorder>
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
export interface ISessao {
    id: number;
    data: string;
    status: 'feita' | 'agendada' | 'cancelada';
}
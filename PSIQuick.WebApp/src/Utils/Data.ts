const opcoesData: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export function DataAgoraPorExtenso() {
    return (new Date()).toLocaleDateString('pt-BR', opcoesData);
}
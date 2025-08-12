import { LoginMock } from "../../Mocks/LoginMock";

const opcoesData: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',

}

export default function Index() {
    return (
        <main>
            <p>{(new Date()).toLocaleDateString('pt-BR', opcoesData)}</p>
            <p>Seja bem vindo <b>Dr. {LoginMock.Nome}</b>.</p>
        </main>)
}
import { LoginMock } from "../../Mocks/LoginMock";
import { DataAgoraPorExtenso } from "../../Utils/Data";

export default function Index() {
    return (
        <main>
            <p>{DataAgoraPorExtenso()}</p>
            <p>Seja bem vindo <b>Dr. {LoginMock.Nome}</b>.</p>
        </main>)
}
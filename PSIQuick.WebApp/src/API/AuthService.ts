import type { ILogin } from "../Interfaces/ILogin";
import { apiFetch } from "./APIFetch";

export async function Login(login: ILogin) {
    try {
        const result = await apiFetch<{ token: string }>("/auth/login", {
            method: "POST",
            body: JSON.stringify(login),
        });
        localStorage.setItem("token", result.token);
    } catch (err: any) {
        console.error("Erro no login:", err);
        throw new Error("Falha ao autenticar. Verifique suas credenciais.");
    }
}
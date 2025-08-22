import type { IPaciente } from "../Interfaces/IPaciente";
import { apiFetch } from "./APIFetch";

export async function GetPacientes() {
    const response = await apiFetch<IPaciente[]>('/paciente');

    return response;
}
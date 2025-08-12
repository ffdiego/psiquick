import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Components/Layout/Layout";

import Index from "./Pages/Index/Index";
import Problemas from "./Pages/Problemas/Problemas";
import ListaPacientes from "./Pages/ListaPaicentes/ListaPacientes";
import Consultas from "./Pages/Sessoes/Sessoes";
import { Paciente } from "./Pages/Paciente/Paciente";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: '/pacientes',
        element: <ListaPacientes />
      },
      {
        path: '/pacientes/:id',
        element: <Paciente />
      },
      {
        path: '/problemas',
        element: <Problemas />
      },
      {
        path: '/consultas',
        element: <Consultas />
      }
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Components/Layout/Layout";

import Index from "./Pages/Index/Index";
import Problemas from "./Pages/Problemas/Problemas";
import Pacientes from "./Pages/Pacientes/Pacientes";
import Consultas from "./Pages/Consultas/Consultas";
import { PacienteDetails } from "./Pages/PacienteDetails/PacienteDetails";

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
        element: <Pacientes />
      },
      {
        path: '/pacientes/:id',
        element: <PacienteDetails />
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

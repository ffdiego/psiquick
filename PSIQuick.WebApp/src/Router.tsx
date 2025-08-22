import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./Components/Layout/Layout";

import Dashboard from "./Pages/Index/Dashboard";
import Problemas from "./Pages/Problemas/Problemas";
import ListaPacientes from "./Pages/ListaPacientes/ListaPacientes";
import Consultas from "./Pages/Sessoes/Sessoes";
import { Paciente } from "./Pages/Paciente/Paciente";
import { Login } from "./Pages/Login/Login";
import { PrivateRoute } from "./Auth/PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
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

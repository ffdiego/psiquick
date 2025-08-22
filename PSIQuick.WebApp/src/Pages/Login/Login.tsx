import { Alert, Button, Center, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { TbAlertCircle } from "react-icons/tb";
import { useAuth } from "../../Auth/AuthContext";
import { apiFetch } from "../../API/APIFetch";
import type { ILogin } from "../../Interfaces/ILogin";
import { useNavigate } from "react-router";
import { AppHeader } from "../../Components/AppHeader/AppHeader";

export function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<ILogin>({
    initialValues: {
      Usuario: "",
      Senha: "",
    },
    validate: {
      Usuario: hasLength({ min: 2, max: 16 }),
      Senha: (value) =>
        value.length >= 4 ? null : "Senha precisa ter ao menos 4 caracteres",
    },
  });

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [user]);

  const handleSubmit = async (values: ILogin) => {
    console.log("aaaa");
    setError(null);
    setLoading(true);

    try {
      const fetch = await apiFetch<{ token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      login(fetch.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center h="100vh">
      <Paper shadow="md" p="xl" radius="md" withBorder w={350}>
        <Stack>
          <AppHeader />
          {error && (
            <Alert
              icon={<TbAlertCircle size={16} />}
              title="Erro"
              color="red"
              variant="light"
            >
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                label="Login"
                {...form.getInputProps("Usuario")}
              />

              <PasswordInput
                label="Senha"
                placeholder="Digite sua senha"
                {...form.getInputProps("Senha")}
              />

              <Button mt='xl' type="submit" loading={loading}>
                Entrar
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
}
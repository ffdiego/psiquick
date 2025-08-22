import { Alert, Button, Center, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useState } from "react";
import { TbAlertCircle } from "react-icons/tb";
import { useAuth } from "../../Auth/AuthContext";

export function Login() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const form = useForm({
        initialValues: {
            login: "",
            password: "",
        },
        validate: {
            login: hasLength({ min: 2, max: 16 }),
            password: (value) =>
                value.length >= 4 ? null : "Senha precisa ter ao menos 4 caracteres",
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setError(null);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Credenciais inválidas");
            }

            const data = await res.json();
            login(data);
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
                    <Title order={3} ta="center">
                        Acesso ao sistema
                    </Title>

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
                                {...form.getInputProps("login")}
                            />

                            <PasswordInput
                                label="Senha"
                                placeholder="Digite sua senha"
                                {...form.getInputProps("password")}
                            />

                            <Button type="submit" loading={loading}>
                                Entrar
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Center>
    );
}
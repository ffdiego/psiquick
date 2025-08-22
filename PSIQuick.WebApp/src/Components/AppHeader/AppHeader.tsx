import { Code, Group } from "@mantine/core";
import classes from './AppHeader.module.css';

export function AppHeader() {
    return (
        <Group className={classes.header} justify="space-between">
            <h1>PsiQuick 🖊️</h1>
            <Code fw={700}>v0.0.1</Code>
        </Group>
    );
}
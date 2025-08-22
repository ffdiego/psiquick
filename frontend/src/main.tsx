import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Router } from './Router';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/pt-br';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { AuthProvider } from './Auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
    <MantineProvider defaultColorScheme='dark' theme={theme}>
        <Notifications position='top-center' />
        <DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </DatesProvider>
    </MantineProvider>);

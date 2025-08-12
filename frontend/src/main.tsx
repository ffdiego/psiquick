import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { theme } from './theme';
import { Router } from './Router';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/pt-br';

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
    <MantineProvider defaultColorScheme='dark' theme={theme}>
        <DatesProvider settings={{ locale: 'pt-br', firstDayOfWeek: 0, weekendDays: [0] }}>
            <Router />
        </DatesProvider>
    </MantineProvider>);

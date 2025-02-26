import { Archive, NotificationsActive } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Outlet } from 'react-router-dom';

import './scss/styles.scss';
import './scss/stylesMUI.scss';
import appTheme from './themes/appTheme';

const navigation = [
    {
        segment: '',
        title: 'Главная',
        icon: <DashboardIcon />,
    },
    {
        segment: 'notifications',
        title: 'Уведомления',
        icon: <NotificationsActive />,
    },
    {
        segment: 'archive',
        title: 'Архив пропусков',
        icon: <Archive />,
    },
    {
        segment: 'reports',
        title: 'Отчет',
        icon: <BarChartIcon />,
    },
];

function App() {
    return (
        <ReactRouterAppProvider navigation={navigation} theme={appTheme}>
            <Outlet />
        </ReactRouterAppProvider>
    );
}

export default App;

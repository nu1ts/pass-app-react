import { Archive, Home, NotificationsActive } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import BadgeIcon from '@mui/icons-material/Badge';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Outlet } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import './scss/styles.scss';
import './scss/stylesMUI.scss';
import appTheme from './themes/appTheme';

const navigation = [
    {
        kind: 'header',
        title: 'Управление',
    },
    {
        segment: '',
        title: 'Главная',
        icon: <HomeIcon />,
    },
    {
        segment: 'archive',
        title: 'Заявки',
        icon: <NotificationsActive />,
    },
    {
        segment: 'notifications',
        title: 'Пользователи',
        icon: <PeopleIcon />,
    },

    {
        segment: 'absence',
        title: 'История пропусков',
        icon: <HistoryIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Действия',
    },
    {
        segment: '/logout',
        title: 'Выйти',
        icon: <ExitToAppIcon />,
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

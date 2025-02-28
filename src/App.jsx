import { Archive, Home, NotificationsActive } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';

import appTheme from './themes/appTheme';
import './scss/styles.scss';
import './scss/stylesMUI.scss';

const navigation = [
    {
        kind: 'header',
        title: 'Управление',
    },
    {
        segment: 'home',
        title: 'Главная',
        icon: <HomeIcon />,
    },

    {
        segment: 'users',
        title: 'Пользователи',
        icon: <PeopleIcon />,
    },
    {
        segment: 'archive',
        title: 'Заявки',
        icon: <NotificationsActive />,
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

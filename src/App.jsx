import { NotificationsActive } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
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
        segment: 'absences/requests',
        title: 'Заявки',
        icon: <NotificationsActive />,
    },
    {
        segment: 'absences/history',
        title: 'История пропусков',
        icon: <HistoryIcon />,
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

import { createBrowserRouter } from 'react-router';
import App from '../../App';
import LoginPage from '../../pages/loginPage/LoginPage';
import AppDashboard from '../../components/dashboard/AppDashboard';
const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: AppDashboard,
                children: [
                    {
                        path: '/archive',
                        Component: LoginPage,
                        children: [
                            {
                                path: '/archive/sub',
                                Component: LoginPage,
                            },
                        ],
                    },
                ],
            },
            { path: '/login', Component: LoginPage },
        ],
    },
]);

export default  router;

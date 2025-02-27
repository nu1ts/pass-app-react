import { createBrowserRouter } from 'react-router';
import App from '../../App';
import LoginPage from '../../pages/loginPage/LoginPage';
import AppDashboard from '../../components/dashboard/AppDashboard';
import HomePage from '../../pages/home/HomePage';
import { Component } from 'react';
import ProfilePage from '../../pages/profile/ProfilePage';
import HomeLayout from '../../components/layout/HomeLayout';
import UserAbsences from '../../pages/absences/UserAbsences';

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: AppDashboard,
                children: [
                    {
                        path: '/',
                        Component: HomePage,
                    },
                    {
                        path: '/home',
                        Component: HomeLayout,
                        children: [

                            {
                                path: '/home',
                                Component: ProfilePage,
                            },
                            {
                                path: '/home/absence/my',
                                Component: UserAbsences,
                            }
                        ]
                    },
                    {
                        path: '/archive',
                        Component: LoginPage,
                        children: [
                            {
                                path: '/archive/sub',
                                Component: HomePage,
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

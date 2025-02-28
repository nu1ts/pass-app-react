import { createBrowserRouter } from 'react-router';
import App from '../../App';
import LoginPage from '../../pages/loginPage/LoginPage';
import AppDashboard from '../../components/dashboard/AppDashboard';
import HomePage from '../../pages/home/HomePage';
import { Component } from 'react';
import ProfilePage from '../../pages/profile/ProfilePage';
import HomeLayout from '../../components/layout/HomeLayout';
import UserAbsences from '../../pages/absences/UserAbsences';
import UsersPage from '../../pages/users/UsersPage';
import UsersLayout from '../../components/layout/UsersLayout';

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
                                path: '/home/profile',
                                Component: ProfilePage,
                            },
                            {
                                path: '/home',
                                Component: UserAbsences,
                            }
                        ]
                    },
                    {
                        path: '/users',
                        Component: UsersLayout,
                        children: [

                            {
                                path: '/users/',
                                Component: UsersPage,
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

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
import RequestAbsences from '../../pages/absences/RequestAbsences';
import UserProfilePage from '../../pages/users/UserProfilePage';
import CreateAbsence from '../../pages/absences/CreateAbsence';

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
                        Component: ProfilePage
                    },
                    {
                        path: '/users',
                        Component: UsersLayout,
                        children: [

                            {
                                path: '/users/',
                                Component: UsersPage,
                            }
                        ],
                        
                    },
                    {
                        path: '/users/:id',
                        Component: UserProfilePage,
                    },
                    {
                        path: '/absences/requests',
                        Component: RequestAbsences,
                        
                    },
                    {
                        path: '/absences/create',
                        Component: CreateAbsence,
                        
                    },
                    {
                        path: '/absences/history',
                        Component: UserAbsences,
                    },
                ],
            },
            { path: '/login', Component: LoginPage },
        ],
    },
]);

export default  router;

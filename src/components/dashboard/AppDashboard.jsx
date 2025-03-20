import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { CustomAppTitle } from '../logotype/AppLogo';
import { Outlet, useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logoutUser } from '../../api/account/accountService';
import { useDispatch } from 'react-redux';
import { clearSession } from '../../store/actions/authAction';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = async () => {
        const response = await logoutUser();
        if (response.ok) {
            dispatch(clearSession());
        }
        navigate('/login');
    };
    return (
        <>
            <ExitToAppIcon onClick={handleClick} sx={{ cursor: 'pointer' }} />
        </>
    );
};

function AppDashboard() {
    return (
        <DashboardLayout
            defaultSidebarCollapsed
            slots={{
                appTitle: CustomAppTitle,
                toolbarActions: Logout,
            }}
        >
            <Outlet />
        </DashboardLayout>
    );
}

export default AppDashboard;

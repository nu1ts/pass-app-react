import * as React from 'react';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { CustomAppTitle } from '../logotype/AppLogo';
import { Outlet } from 'react-router-dom';

function AppDashboard() {
    return (
        <DashboardLayout
            defaultSidebarCollapsed
            slots={{
                appTitle: CustomAppTitle,
            }}
        >
            <Outlet />
        </DashboardLayout>
    );
}

export default AppDashboard;

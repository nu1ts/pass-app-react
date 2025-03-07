import * as React from 'react';
import { Outlet } from 'react-router';
import { DashboardLayout, PageContainer } from '@toolpad/core';

export default function AppLayout() {
    return (
        <DashboardLayout>
            <PageContainer>
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}

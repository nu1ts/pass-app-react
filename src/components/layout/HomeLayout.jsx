import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function HomeLayout() {
    const [value, setValue] = React.useState('/home');
    const navigate = useNavigate();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        navigate(value);
    }, [value]);

    return (
        <>
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        margin: '0 20px',
                        overflow: 'hidden',
                    }}
                >
                    <TabList onChange={handleChange}>
                        <Tab
                            label='Мои профиль'
                            value='/home'
                            sx={{
                                padding: '10px',
                                margin: '10px 20px',
                                borderRadius: '4px',
                                fontWeight: '500',
                                fontSize: '16px',
                                textTransform: 'none',
                            }}
                        />
                        <Tab
                            label='Мои пропуска'
                            value='/home/absence/my'
                            sx={{
                                padding: '10px',
                                margin: '10px 20px',
                                borderRadius: '4px',
                                fontWeight: '500',
                                fontSize: '16px',
                                textTransform: 'none',
                            }}
                        />
                    </TabList>
                </Box>
                <TabPanel
                    value={value}
                    sx={{
                        paddingY: 0,
                        overflowY: 'scroll',
                        minHeight: '400px',
                        height: 'auto',
                        maxHeight: '620px',
                    }}
                >
                    <Outlet />
                </TabPanel>
            </TabContext>
        </>
    );
}

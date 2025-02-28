import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SearchInput from '../search/SearchInput';
import { useInput } from '../../hooks/useInput';
export default function UsersLayout() {
    const [value, setValue] = React.useState('/users/students');
    const search = useInput('', {});
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TabContext value={value}>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        margin: '0 20px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <TabList onChange={handleChange}>
                        <Tab
                            label='Студенты'
                            value='/users/students'
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
                            label='Преподаватели'
                            value='/users/teachers'
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
                            label='Деканат'
                            value='/users/dekan'
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
                    <SearchInput
                        value={search.value}
                        onChange={(e) => {
                            search.onChange(e);
                        }}
                    />
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

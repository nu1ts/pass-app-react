import * as React from 'react';
import { Outlet } from 'react-router';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material';

import UserPageFilter from '../filters/UserPageFilter';

export default function UsersLayout() {
    const [value, setValue] = React.useState('Student');
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <TabContext value={value} sx={{ boxSizing: 'border-box' }}>
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
                        minHeight: '80px',
                    }}
                >
                    <TabList onChange={handleChange}>
                        <StyledTab
                            label='Студенты'
                            value='Student'
                            sx={{
                                padding: '10px',
                                margin: '10px 20px',
                                borderRadius: '4px',
                                fontWeight: '500',
                                fontSize: '16px',
                                textTransform: 'none',
                            }}
                        />
                        <StyledTab
                            label='Преподаватели'
                            value='Teacher'
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
                <UserPageFilter selectedRole={value} />
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

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '#676567',
    transition: '0.1s ease-in-out',
    '&.Mui-selected': {
        color: '#1165c9',
        backgroundColor: '#edf4fc',
    },
}));

import * as React from 'react';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material';

import UserPageFilter from '../filters/UserPageFilter';

export default function UsersLayout() {
    const [value, setValue] = React.useState('students');
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
                            value='students'
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
                            value='teachers'
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

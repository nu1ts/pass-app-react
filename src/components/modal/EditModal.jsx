import { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    TextField,
    FormControlLabel,
    Switch,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useInput } from '../../hooks/useInput';
import { changeUsersRole, updateUsersProfile } from '../../api/users/usersService';
import { ErrorToast, SuccessToast, WarningToast } from '../../utils/notifications/notifications';
import { ERROR_400, ERROR_401, SERVER_ERROR } from '../../utils/constants/errorCode';

export default function EditModal({ isOpen, handleClose, user }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isValidForm, setIsValidForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fullName = useInput('', { isEmpty: true });
    const group = useInput('', { isEmpty: true });
    const email = useInput('', { isEmailValid: true, isEmpty: true });
    const [roles, setRoles] = useState([]);
    const [studentChecked, setStudentChecked] = useState(false);
    const [teacherChecked, setTeacherChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log({
            fullName: fullName.value,
            email: email.value,
            groupId: group.value,
        });
        const response = await updateUsersProfile(user.id, {
            fullName: fullName.value,
            email: email.value,
            groupId: group.value,
        });
        if (response.ok) {
            SuccessToast('Данные обновлены');
        } else {
            if (response.status === 400) {
                ErrorToast(ERROR_400);
            }
            if (response.status === 401) {
                WarningToast(ERROR_401);
            }
            if (response.status >= 500) {
                ErrorToast(SERVER_ERROR);
            }
        }

        const rolesResponse = await changeUsersRole(user.id, roles);
        setIsLoading(false);
        handleClose();
    };

    const handleStudentChecked = (e) => {
        setStudentChecked((prev) => !prev);
    };
    const handleTeacherChecked = (e) => {
        setTeacherChecked((prev) => !prev);
    };
    const handleForm = () => {
        if (email.isEmptyError || fullName.isEmptyError || email.emailError || group.isEmptyError) {
            setIsValidForm(false);
        } else {
            setIsValidForm(true);
        }
    };

    useEffect(() => {
        if (studentChecked) {
            if (!roles.includes('Student')) roles.push('Student');
        } else {
            roles.splice(roles.indexOf('Student'));
        }
        if (teacherChecked) {
            if (!roles.includes('Teacher')) roles.push('Teacher');
        } else {
            roles.splice(roles.indexOf('Teacher'));
        }
        setRoles((prev) => [...prev]);
        console.log(roles);
    }, [studentChecked, teacherChecked]);

    useEffect(() => {
        email.setValue(user.email);
        fullName.setValue(user.fullName);
        group.setValue(user.groupId);
        setStudentChecked(user?.roles?.includes('Student') || false);
        setTeacherChecked(user?.roles?.includes('Teacher') || false);
    }, [user]);

    useEffect(() => {
        handleForm();
    }, [email.value, fullName.value, group.value, roles]);

    return (
        <>
            <Dialog fullScreen={fullScreen} open={isOpen} onClose={handleClose}>
                <DialogTitle>Редактирование данных</DialogTitle>
                <DialogContent
                    sx={{
                        boxSizing: 'border-box',
                        maxWidth: '900px',
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    <form action='' onSubmit={handleSubmit}>
                        <div className='input-wrapper'>
                            <TextField
                                label={'ФИО'}
                                sx={{ width: 1, marginBottom: '10px' }}
                                value={fullName.value}
                                onChange={(e) => {
                                    fullName.onChange(e);
                                }}
                            />
                            <TextField
                                label={email.emailError ? 'Невалидный email' : 'Email'}
                                type={'email'}
                                sx={{ width: 1, marginBottom: '20px' }}
                                value={email.value}
                                onChange={(e) => {
                                    email.onChange(e);
                                }}
                                error={email.emailError}
                            />
                            <div className='flex column-d justify-content-sb'>
                                <div className='flex column-d'>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={studentChecked}
                                                onChange={(e) => handleStudentChecked(e)}
                                            />
                                        }
                                        label='Студент'
                                        labelPlacement='end'
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={teacherChecked}
                                                onChange={(e) => handleTeacherChecked(e)}
                                            />
                                        }
                                        label='Преподаватель'
                                        labelPlacement='end'
                                    />
                                </div>
                                {user?.roles?.includes('Student') && (
                                    <TextField
                                        label={'Группа'}
                                        inputProps={{
                                            maxLength: 6,
                                            type: 'number',
                                        }}
                                        inputMode={'numeric'}
                                        size='medium'
                                        sx={{ width: '49%', height: '56px', marginTop: '10px' }}
                                        value={group.value}
                                        onChange={(e) => {
                                            let res = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, e.target.maxLength);
                                            group.setValue(isNaN(res) ? '' : res);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions sx={{ marginRight: '18px', marginBottom: '10px' }}>
                    <Button autoFocus onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button
                        variant='contained'
                        type='submit'
                        onClick={handleSubmit}
                        autoFocus
                        loading={isLoading}
                        disabled={!isValidForm}
                        sx={{
                            backgroundColor: '#ffbf03',
                            color: '#000',
                        }}
                    >
                        Изменить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

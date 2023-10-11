import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutHandlerThunk } from '../../redux/slices/user/UserThunks';
import ModalButton from './ModalButton';

const linkStyle = { color: 'white', mr: 2, fontFamily: 'Raleway, Arial' };

export default function NavBar(): JSX.Element {
    const user = useAppSelector((store) => store.user);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleOpen = (): void => {
        setOpen(true);
    }

    const links =
        user.status === 'logged'
            ? [

                { to: '/userRevue', name: 'User Revue Page' },

            ]
            : [
                { to: '/', name: 'Main Page' },
                { to: '/service', name: 'Service Page' },
                { to: '/sale', name: 'Sale Page' },
                { to: '/revue', name: 'Revue Page' },
                { to: '/master', name: 'Master Page' },
                { to: '/signup', name: 'Sign Up' },
                { to: '/login', name: 'Login' },
            ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box>
                        {links.map((link) => (
                            <Link key={link.name} component={NavLink} to={link.to} sx={linkStyle}>
                                {link.name}
                            </Link>
                        ))}
                    </Box>
                    <Box>
                        {user.status === 'logged' && (
                            <Button
                                variant="text"
                                sx={linkStyle}
                                onClick={() => void dispatch(logoutHandlerThunk())}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                    <Box
                        onClick={handleOpen}
                        sx={{
                            padding: '8px 16px',
                            backgroundColor: 'white',
                            color: '#6a329f',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Записаться
                    </Box>
                    <ModalButton open={open} setOpen={setOpen} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
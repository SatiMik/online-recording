import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutHandlerThunk } from '../../redux/slices/user/UserThunks';

const linkStyle = { color: 'white', mr: 2, fontFamily: 'Raleway, Arial' };

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  const links =
    user.status === 'guest'
      ? [
          { to: '/', name: 'Главная' },
          { to: '/service', name: 'Услуги' },
          { to: '/master', name: 'Мастера' },
          { to: '/sale', name: 'Акции' },
          { to: '/revue', name: 'Отзывы' },
          { to: '/signup', name: 'Зарегистрироваться' },
          { to: '/login', name: 'Войти' },
        ]
      : [
          { to: '/', name: 'Главная' },
          { to: '/service', name: 'Услуги' },
          { to: '/master', name: 'Мастера' },

          { to: '/sale', name: 'Акции' },
          { to: '/revue', name: 'Отзывы' },
          { to: '/userRecords', name: 'Мои записи' },
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
                Выйти
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

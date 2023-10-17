import React, { useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import { Link, IconButton, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logoutHandlerThunk } from '../../redux/slices/user/UserThunks';
import ModalButton from './application/ModalButton';
import AuthModal from './auth/AuthModal';
import LogoutModal from './auth/LogoutModal';

const linkStyle = { color: 'white', mr: 2, fontFamily: 'Raleway, Arial' };

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [authType, setAuthType] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useAppDispatch();
  const applications = useAppSelector((state) => state.application);

  const handleOpen = (): void => {
    setOpen(true);
  };
  // req.session.user, handler на user. axios запрос который будет брать данные юзера из сессии
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
          {
            to: '/application',
            name: (
              <>
                <IconButton>
                  <Badge badgeContent={applications.length} color="secondary">
                    <MailIcon style={{ color: 'white' }} />
                  </Badge>
                </IconButton>{' '}
              </>
            ),
          },
          { to: '/', name: 'Главная' },
          { to: '/service', name: 'Услуги' },
          { to: '/master', name: 'Мастера' },
          { to: '/sale', name: 'Акции' },
          { to: '/revue', name: 'Отзывы' },
          { to: '/user-records', name: 'Мои записи' },
          {
            to: '/online-record',
            name: (
              <>
                {' '}
                <Button
                  disabled
                  sx={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#6a329f',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Онлайн запись
                </Button>
              </>
            ),
          },
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
            {user.status === 'logged' ? (
              <Button variant="text" sx={linkStyle} onClick={() => setIsLogout(true)}>
                Выход
              </Button>
            ) : (
              <>
                <Button
                  variant="text"
                  sx={linkStyle}
                  onClick={() => {
                    setAuth(true);
                    setAuthType(1);
                  }}
                >
                  Регистрация
                </Button>
                <Button
                  variant="text"
                  sx={linkStyle}
                  onClick={() => {
                    setAuth(true);
                    setAuthType(2);
                  }}
                >
                  Вход
                </Button>
              </>
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
            Оставить заявку
          </Box>
          <ModalButton open={open} setOpen={setOpen} />
          <AuthModal auth={auth} setAuth={setAuth} authType={authType} setAuthType={setAuthType} />
          <LogoutModal isLogout={isLogout} setIsLogout={setIsLogout} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

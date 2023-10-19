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
import ModalButton from './application/ModalButton';
import AuthModal from './auth/AuthModal';
import LogoutModal from './auth/LogoutModal';

const linkStyle = { color: 'white', mr: 2, fontFamily: 'Raleway, Arial', textDecoration: 'none' };

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const [authType, setAuthType] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useAppDispatch();
  const applications = useSelector((state) => state.application);
  const applicationNotAccepted = applications.filter((application) => !application.status);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const links =
    user.status === 'guest'
      ? [
          { to: '/', name: 'Главная' },
          { to: '/service', name: 'Услуги' },
          { to: '/master', name: 'Мастера' },
          { to: '/sale', name: 'Акции' },
          { to: '/revue', name: 'Отзывы' },
        ]
      : [
          { to: '/service', name: 'Услуги' },
          { to: '/master', name: 'Мастера' },
          { to: '/sale', name: 'Акции' },
          { to: '/revue', name: 'Отзывы' },
        ];

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#566F5F' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          {user.status === 'logged' && user?.isAdmin ? (
            <Link component={NavLink} to="/application" sx={linkStyle}>
              <IconButton>
                <Badge
                  badgeContent={applicationNotAccepted.length}
                  sx={{ color: 'white' }}
                  color="secondary"
                >
                  <MailIcon style={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </Link>
          ) : null}
          {user.status === 'logged' && !user.isAdmin ? (
            <Link
              key="Мои записи"
              component={NavLink}
              to="/userRecords"
              sx={{
                ...linkStyle,
                padding: '6px 12px',


              }}
            >
              Мои записи
            </Link>
          ) : null}
          {user.status === 'logged' && user?.isAdmin ? (
            <Link
              key="Расписание записей"
              component={NavLink}
              to="/admin"
              sx={{
                ...linkStyle,
                padding: '6px 12px',
                transition: '0.1s',
                '&:hover': {
                  borderRadius: '4px',
                },
              }}
            >
              Расписание записей
            </Link>
          ) : null}

          {user.status === 'logged' && !user?.isAdmin && (
            <Link
              key="Главная"
              component={NavLink}
              to="/"
              sx={{
                ...linkStyle,
                padding: '6px 12px',
                // transition: '0.3s',
                // margin: '6px 14px',
                '&:hover': {
                  // transform: 'scale(1.05)',
                  // backgroundColor: 'white',
                  // color: '#566F5F',
                  borderRadius: '4px',
                  // fontSize: '1.21em', // Добавьте это свойство для увеличения размера текста
                },
              }}
            >
              Главная
            </Link>
          )}
          <Box>
            {links.map((link) => (
              <Link
                key={link.name}
                component={NavLink}
                to={link.to}
                sx={{
                  ...linkStyle,
                  padding: '6px 12px',
                  // transition: '0.3s',
                  // margin: '6px 14px',
                  '&:hover': {
                    // transform: 'scale(1.05)',
                    // backgroundColor: 'white',
                    // color: '#566F5F',
                    borderRadius: '4px',
                    // fontSize: '1.21em', // Добавьте это свойство для увеличения размера текста
                  },
                }}
              >
                {link.name}
              </Link>
            ))}

            {(user.status === 'logged' && !user.isAdmin) || user.status === 'guest' ? (
              <Link component={NavLink} to="/online-record" sx={linkStyle}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: '#566F5F',
                    padding: '6px 14px',
                    borderRadius: '4px',
                  }}
                >
                  Записаться онлайн
                </Button>

              </Link>
            ) : null
            }
            {user.status === 'guest' ? (
              <Link component={NavLink} to="/online-record" sx={linkStyle}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    backgroundColor: '#566F5F',
                    padding: '6px 14px',
                    borderRadius: '4px',
                  }}
                >
                  Записаться онлайн
                </Button>
              </Link>
            ) : null}
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
          {(user.status === 'logged' && !user.isAdmin) || user.status === 'guest' ? (
            <Box
              onClick={handleOpen}
              sx={{
                padding: '6px 14px',
                backgroundColor: 'white',
                color: '#566F5F',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '16px',
                borderColor: 'white',
                // transition: '0.2s',
                // '&:hover': {
                //   transform: 'scale(1.05)',
                //   backgroundColor: 'white',
                //   color: '#566F5F',
                //   fontBold: true,
                //   boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Замените на нужное вам значение тени
                // },
              }}
            >
              Оставить заявку
            </Box>
          ) : null}

          <ModalButton open={open} setOpen={setOpen} />
          <AuthModal auth={auth} setAuth={setAuth} authType={authType} setAuthType={setAuthType} />
          <LogoutModal isLogout={isLogout} setIsLogout={setIsLogout} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

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
    <Box>
      <AppBar className="header">
        <div className="navnavbar">
          <div className="cont container">
            <h6>Салон Красоты</h6>
            <div className="links">
              <a href="/">
                <div className="img">
                  <i />
                </div>
              </a>
              <a href="/">
                <div className="img">
                  <i />
                </div>
              </a>
              <a href="/">
                <div className="img">
                  <i />
                </div>
              </a>
            </div>
          </div>
        </div>
        <Toolbar className="navbar">
          <div className="container flex">
            {user.status === 'logged' && user?.isAdmin ? (
              <Link component={NavLink} to="/application">
                <IconButton>
                  <Badge badgeContent={applicationNotAccepted.length} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Link>
            ) : null}
            {user.status === 'logged' && !user.isAdmin ? (
              <Link className="myZapiz" key="Мои записи" component={NavLink} to="/userRecords">
                Мои записи
              </Link>
            ) : null}
            {user.status === 'logged' && user?.isAdmin ? (
              <Link key="Расписание записей" component={NavLink} to="/admin">
                Расписание записей
              </Link>
            ) : null}

            {user.status === 'logged' && !user?.isAdmin && (
              <Link key="Главная" component={NavLink} to="/">
                Главная
              </Link>
            )}
            <Box className="navbartext">
              {links.map((link) => (
                <Link key={link.name} component={NavLink} to={link.to}>
                  {link.name}
                </Link>
              ))}

              {user.status !== 'loading' || (user.status === 'logged' && !user.isAdmin) ? (
                <Link
                  style={{ display: 'none' }}
                  className="record"
                  component={NavLink}
                  to="/online-record"
                >
                  <Button variant="outlined">Записаться онлайн</Button>
                </Link>
              ) : null}
            </Box>
            <Box>
              {user.status === 'logged' ? (
                <Button
                  style={{ backgroundColor: 'black' }}
                  className="loginbtn"
                  variant="text"
                  onClick={() => setIsLogout(true)}
                >
                  Выход
                </Button>
              ) : (
                <>
                  <Button
                    className="loginbtn"
                    variant="text"
                    onClick={() => {
                      setAuth(true);
                      setAuthType(1);
                    }}
                  >
                    Регистрация
                  </Button>
                  <Button
                    className="loginbtn"
                    variant="text"
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
            {user.status !== 'loading' || (user.status === 'logged' && !user.isAdmin) ? (
              <Box onClick={handleOpen}>Оставить заявку</Box>
            ) : null}

            <ModalButton open={open} setOpen={setOpen} />
            <AuthModal
              auth={auth}
              setAuth={setAuth}
              authType={authType}
              setAuthType={setAuthType}
            />
            <LogoutModal isLogout={isLogout} setIsLogout={setIsLogout} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

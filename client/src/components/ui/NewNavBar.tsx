import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

type Props = {
  window?: () => Window;
};

export default function DrawerAppBar(props: Props): JSX.Element {
  const drawerWidth = 240;
  const applications = useAppSelector((state) => state.application);
  const user = useAppSelector((store) => store.user);
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems =
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
              <IconButton>
                <Badge badgeContent={applications.length} color="secondary">
                  <MailIcon style={{ color: 'white' }} />
                </Badge>
              </IconButton>
            ),
          },
          { to: '/', name: 'Главная' },
          { to: '/service', name: 'Услуги' },
          { to: '/master', name: 'Мастера' },
          { to: '/sale', name: 'Акции' },
          { to: '/revue', name: 'Отзывы' },
          { to: '/userRecords', name: 'Мои записи' },
          {
            to: '/online-record',
            name: (
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
            ),
          },
        ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.to}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={item.to}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            onClick={handleDrawerToggle}
          >
            Меню
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.to} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}



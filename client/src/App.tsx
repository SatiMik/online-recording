import { Box, Container, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthPage from './components/pages/AuthPage';
import Navbar from './components/ui/Navbar';
import MainPage from './components/pages/MainPage';
import PrivateRoute from './hocs/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/UserThunks';
import UserRevuePage from './components/pages/UserRevuePage';
import SalePage from './components/pages/SalePage';
import RevuePage from './components/pages/RevuePage';
import ServicePage from './components/pages/ServicePage';
import MasterPage from './components/pages/MasterPage';
import Loader from './hocs/Loader';
import ApplicationPage from './components/pages/ApplicationPage';

function App(): JSX.Element {
  const theme = createTheme({
    palette: {
      primary: { main: '#6a329f' },
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);

  const user = useAppSelector((store) => store.user);

  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={user.status === 'loading'}>
        <>
          <Navbar />
          <Box mt={5}>
            <Container>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/revue" element={<RevuePage />} />
                <Route path="/sale" element={<SalePage />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/master" element={<MasterPage />} />
                <Route path="/application" element={<ApplicationPage />} />

                <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                  <Route path="/userRevue" element={<UserRevuePage />} />
                </Route>

                <Route
                  path="/:auth"
                  element={
                    <PrivateRoute isAllowed={user.status === 'guest'}>
                      <AuthPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Container>
          </Box>
        </>
      </Loader>
    </ThemeProvider>
  );
}

export default App;

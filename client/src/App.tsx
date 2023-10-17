import { Box, Container, Icon, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/ui/Navbar';
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
import MastersPage from './components/ui/online-record/MastersPage';
import MasterServicesPage from './components/ui/online-record/MasterServicesPage';
import CategoryPage from './components/pages/CategoryPage';
import OnlineRecordPage from './components/pages/OnlineRecordPage';
import Footer from './components/ui/Footer/Futer';

// прописать проверки на гостя, тк нет привата на регистрацию

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
                <Route path="/service" element={<CategoryPage />} />
                <Route path="/services/:serviceId" element={<ServicePage />} />
                <Route path="/online-record" element={<OnlineRecordPage />} />

                <Route path="/master" element={<MasterPage />} />
                <Route path="/online-record" element={<OnlineRecordPage />} />
                <Route path="/online-record/masters" element={<MastersPage />} />
                <Route
                  path="/online-record/masters/:masterId/services"
                  element={<MasterServicesPage />}
                />

                <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                  <Route path="/userRevue" element={<UserRevuePage />} />
                </Route>

                <Route
                  element={<PrivateRoute isAllowed={user.status === 'logged' && user?.isAdmin} />}
                >
                  <Route path="/application" element={<ApplicationPage />} />
                </Route>
              </Routes>
            </Container>
          </Box>
        </>
      </Loader>
      <Footer />
    </ThemeProvider>
  );
}

export default App;

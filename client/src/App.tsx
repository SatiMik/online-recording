import { Box, Container, Icon, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// import Navbar from './components/ui/Navbar';
import Navbar from './components/ui/Navbar';
import MainPage from './components/pages/MainPage';
import PrivateRoute from './hocs/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/UserThunks';
import SalePage from './components/pages/SalePage';
import RevuePage from './components/pages/RevuePage';
import ServicePage from './components/pages/ServicePage';
import MasterPage from './components/pages/MasterPage';
import AdminPage from './components/pages/AdminPage';
import Loader from './hocs/Loader';
import ApplicationPage from './components/pages/ApplicationPage';
import CategoryPage from './components/pages/CategoryPage';
import OnlineRecordPage from './components/pages/online-record/OnlineRecordPage';
import OnlineMastersPage from './components/pages/online-record/OnlineMastersPage';
import UserRecordsPage from './components/pages/UserRecordsPage';
import OnlineServicesPage from './components/pages/online-record/OnlineServicesPage';
import NavBar from './components/ui/Navbar';

function App(): JSX.Element {
  const theme = createTheme({
    typography: {
      fontFamily: 'Raleway',
    },
    palette: {
      primary: { main: '#566F5F' },
      secondary: { main: '#DFDBDC' },
      newColor: { main: '#AF8678' },
    },
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);

  const user = useAppSelector((store) => store.user);

  return (
    <ThemeProvider theme={theme}>
      <Loader isLoading={user.data.status === 'loading'}>
        <>
          <NavBar />
          <Box mt={5}>
            <Container>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/revue" element={<RevuePage />} />
                <Route path="/sale" element={<SalePage />} />
                <Route path="/service" element={<CategoryPage />} />
                <Route path="/services/:categoryId" element={<ServicePage />} />
                <Route path="/master" element={<MasterPage />} />
                <Route path="/online-record" element={<OnlineRecordPage />} />
                <Route path="/online-record/masters" element={<OnlineMastersPage />} />

                <Route path="/online-record/services" element={<OnlineServicesPage />} />

                <Route
                  element={
                    <PrivateRoute isAllowed={user.data?.status === 'logged' && !user.data?.isAdmin} />
                  }
                >
                  <Route path="/userRecords" element={<UserRecordsPage />} />
                </Route>

                <Route
                  element={
                    <PrivateRoute isAllowed={user.data?.status === 'logged' && user.data?.isAdmin} />
                  }
                >
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/application" element={<ApplicationPage />} />
                </Route>

              </Routes>
            </Container>
          </Box>
        </>
      </Loader>
      {/* <FooterNew /> */}
    </ThemeProvider>
  );
}

export default App;

import { Box, Container, Icon, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import MainPage from './components/pages/MainPage';
import PrivateRoute from './hocs/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkUserThunk } from './redux/slices/user/UserThunks';
import SalePage from './components/pages/SalePage';
import RevuePage from './components/pages/RevuePage';
import ServicePage from './components/pages/ServicePage';
import MasterPage from './components/pages/MasterPage';
import Loader from './hocs/Loader';
import ApplicationPage from './components/pages/ApplicationPage';
import MastersPage from './components/ui/online-record/MastersPage';
import MasterServicesPage from './components/ui/online-record/MasterServicesPage';
import CategoryPage from './components/pages/CategoryPage';
import OnlineRecordPage from './components/ui/online-record/OnlineRecordPage';
import Footer from './components/ui/Footer/Futer';
import UserRecordsPage from './components/pages/UserRecordsPage';
import OnlineServicePage from './components/ui/online-record/OnlineServicePage';
import OnlineServiceCategoryPage from './components/ui/online-record/OnlineServiceCategoryPage';
import OnlineMasterServicesPage from './components/ui/online-record/OnlineMasterServicesPage';
import OnlineMastersPage from './components/ui/online-record/OnlineMastersPage';
import OnlineCategoryServicesPage from './components/ui/online-record/OnlineCategoryServicesPage';
import OnlineChooseMasterPage from './components/ui/online-record/OnlineChooseMasterPage';

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
                <Route path="/services/:categoryId" element={<ServicePage />} />
                <Route path="/master" element={<MasterPage />} />
                <Route path="/online-record" element={<OnlineRecordPage />} />
                <Route path="/online-record/masters" element={<OnlineMastersPage/>} />
                <Route
                  path="/online-record/masters/:masterId/services"
                  element={<OnlineMasterServicesPage  />}
                />
                <Route path="/online-record/services" element={<OnlineServicePage />} />
                <Route path="/online-record/services/:categoryId" element={<OnlineServiceCategoryPage />} />
                <Route path="/online-record/services/category/:categoryId" element={<OnlineCategoryServicesPage />} />
                <Route path="/online-record/services/masters/:serviceId" element={<OnlineChooseMasterPage/>} />



                <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                  <Route path="/user-records" element={<UserRecordsPage />} />
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

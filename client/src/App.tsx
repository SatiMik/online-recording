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
import OnlineMasterServicesPage from './components/ui/online-record/услуги со временем/OnlineMasterServicesPage';
import CategoryPage from './components/pages/CategoryPage';
// import OnlineRecordPage from './components/ui/online-record/OnlineRecordPage';
import FooterNew from './components/footer/Footer';
// import OnlineServicePage from './components/ui/online-record/serviceRecord/OnlineServicePage';
import OnlineRecordPage from './components/pages/online-record/OnlineRecordPage';
import Footer from './components/ui/Footer/Futer';
// import OnlineCategoryServicesPage from './components/ui/online-record/serviceRecord/categories/OnlineCategoryServicesPage';
import OnlineMastersPage from './components/pages/online-record/OnlineMastersPage';
// import OnlineServicePage from './components/pages/online-record/OnlineServicesPage';
import OnlineServiceCategoryPage from './components/ui/online-record/onlineCategory/OnlineServiceCategoryPage';
import UserRecordsPage from './components/pages/UserRecordsPage';
import OnlineServicesPage from './components/pages/online-record/OnlineServicesPage';

// прописать проверки на гостя, тк нет привата на регистрацию

function App(): JSX.Element {
  const theme = createTheme({
    palette: {
      primary: { main: '#566F5F' },
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
                <Route path="/online-record/masters" element={<OnlineMastersPage />} />
                <Route path="/admin" element={<AdminPage />} />
                {/* <Route
                  path="/online-record/masters/:masterId/services"
                  element={<OnlineMasterServicesPage />}
                /> */}
                <Route path="/online-record/services" element={<OnlineServicesPage />} />
                {/* <Route
                  path="/online-record/services/:categoryId"
                  element={<OnlineServiceCategoryPage />}
                />
                <Route
                  path="/online-record/services/category/:categoryId"
                  element={<OnlineCategoryServicesPage />}
                /> */}

                <Route element={<PrivateRoute isAllowed={user.status === 'logged'} />}>
                  <Route path="/userRecords" element={<UserRecordsPage />} />
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
      <FooterNew />
    </ThemeProvider>
  );
}

export default App;

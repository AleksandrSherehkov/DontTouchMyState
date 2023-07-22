import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'routes/ProtectedRoute';
import { PublicRoute } from 'routes/PublicRoute';
import { selectIsRefreshing } from 'redux/auth/authSelectors';
import { fetchCurrentUserThunk } from 'redux/auth/authOperations';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { GlobalStyle } from 'services/styles/GlobalStyle';

const DashboardPage = lazy(() => import('pages/DashboardPage/DashboardPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const SummaryPage = lazy(() => import('pages/SummaryPage/SummaryPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const LoadingPage = lazy(() => import('pages/LoadingPage/LoadingPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/login"
              element={
                <PublicRoute
                  component={<LoginPage />}
                  restricted
                  redirectTo="/"
                />
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute
                  component={<RegisterPage />}
                  restricted
                  redirectTo="/"
                />
              }
            />
            <Route
              element={
                <ProtectedRoute
                  component={<DashboardPage />}
                  redirectTo="/login"
                />
              }
            >
              <Route
                index
                element={
                  <ProtectedRoute
                    component={<HomePage />}
                    redirectTo="/login"
                  />
                }
              />
              <Route
                path="statistic"
                element={
                  <ProtectedRoute
                    component={<SummaryPage />}
                    redirectTo="/login"
                  />
                }
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      <GlobalStyle />
    </>
  );
};

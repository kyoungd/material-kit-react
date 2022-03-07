import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Tutorial from './pages/PageTutorial';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import { useUserState, useUserDispatch } from './components/UserContext';
//
import Login from './pages/Login';
import Register from './pages/Register';
import LoginRedirect from './pages/LoginRedirect';
import PageLoginSuccess from './pages/PageLoginSuccess';

// --------------------------------- yes -------------------------------------

export default function Router() {
  const userDispatch = useUserDispatch();
  const { symbols, favorites } = useUserState();

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace="true" /> },
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'user',
          element: (
            <User
              symbols={symbols.length === undefined ? [] : symbols}
              favorites={favorites}
              userDispatch={userDispatch}
            />
          )
        },
        { path: 'tutorial', element: <Tutorial /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/connect/google/redirect', element: <LoginRedirect providerName="google" /> },
        { path: '/connect/facebook/redirect', element: <LoginRedirect providerName="facebook" /> },
        { path: '/connect/twitter/redirect', element: <LoginRedirect providerName="twitter" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '/loginsuccess', element: <PageLoginSuccess /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

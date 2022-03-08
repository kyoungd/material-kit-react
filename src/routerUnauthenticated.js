import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/Page404';
import LoginRedirect from './pages/LoginRedirect';

// --------------------------------- yes -------------------------------------

export default function RouterUnauthenticatd() {
  return useRoutes([
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
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

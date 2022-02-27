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

// --------------------------------- yes -------------------------------------

export default function RouterAuthenticated() {
  const userDispatch = useUserDispatch();
  const { symbols, favorites } = useUserState();

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
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
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

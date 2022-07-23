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
import Favorites from './pages/Favorites';
import PageTop10News from './pages/PageTop10News';
import NotFound from './pages/Page404';
import { useUserState, useUserDispatch } from './components/UserContext';
//
import Login from './pages/Login';
import Register from './pages/Register';
import LoginRedirect from './pages/LoginRedirect';
import PRODUCTS from './_mocks_/products';
import TUTORIALS from './_mocks_/tutorials';

import USER_ROW from './layouts/User/UserRow';
import RT_ROW from './layouts/Realtime/DisplayRow';

const USER_TRANSLATION = require('./layouts/User/UserTranslation.json');
const USER_TABLE_HEAD = require('./layouts/User/UserTableHead.json');
const USER_EXPLAINERS = require('./layouts/User/UserButtonSetup.json');

const RT_TRANSLATION = require('./layouts/Realtime/Translation.json');
const RT_TABLE_HEAD = require('./layouts/Realtime/TableHead.json');
const RT_EXPLAINERS = require('./layouts/Realtime/ButtonSetup.json');

// --------------------------------- yes -------------------------------------

export default function Router() {
  const userDispatch = useUserDispatch();
  const { symbols, favorites, realtimes, top10news } = useUserState();

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
              translation={USER_TRANSLATION}
              tableHead={USER_TABLE_HEAD}
              explainers={USER_EXPLAINERS}
              rowContent={USER_ROW}
              pageType="DAILY"
            />
          )
        },
        {
          path: 'realtime',
          element: (
            <User
              symbols={realtimes}
              favorites={favorites}
              userDispatch={userDispatch}
              translation={RT_TRANSLATION}
              tableHead={RT_TABLE_HEAD}
              explainers={RT_EXPLAINERS}
              rowContent={RT_ROW}
              pageType="REALTIME"
            />
          )
        },
        { path: 'news', element: <PageTop10News newsList={top10news} /> },
        {
          path: 'favorites',
          element: <Favorites favorites={favorites} userDispatch={userDispatch} />
        },
        { path: 'tutorial', element: <Tutorial /> },
        { path: 'products', element: <Products videolist={PRODUCTS} name="Videos" /> },
        { path: 'tutorials', element: <Products videolist={TUTORIALS} name="Tutorials" /> },
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
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

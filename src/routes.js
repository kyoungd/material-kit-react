import faker from 'faker';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import Expert from './pages/Expert';
import PageTop10News from './pages/PageTop10News';
import NotFound from './pages/Page404';
import { useUserState, useUserDispatch } from './components/UserContext';
//
import Login from './pages/Login';
import Register from './pages/Register';
import LoginRedirect from './pages/LoginRedirect';
import PRODUCTS from './_mocks_/products';
import TUTORIALS from './_mocks_/tutorials';
import RealtimeList from './pages/RealtimeList';
import STRIPE_SUCCESS from './pages/stripe-success';
import STRIPE_CANCEL from './pages/stripe-cancel';
import ACCOUNT from './pages/Account';
import EXPERTCHANNELS from './pages/ExpertChannels';
import PageScheduleCalendar from './pages/PageScheduleCalendar';

import USER_ROW from './layouts/User/UserRow';

const USER_TRANSLATION = require('./layouts/User/UserTranslation.json');
const USER_TABLE_HEAD = require('./layouts/User/UserTableHead.json');
const USER_EXPLAINERS = require('./layouts/User/UserButtonSetup.json');

// import Tutorial from './pages/PageTutorial';
// import RT_ROW from './layouts/Realtime/DisplayRow';
// const RT_TRANSLATION = require('./layouts/Realtime/Translation.json');
// const RT_TABLE_HEAD = require('./layouts/Realtime/TableHead.json');
// const RT_EXPLAINERS = require('./layouts/Realtime/ButtonSetup.json');

// --------------------------------- yes -------------------------------------

export default function Router() {
  const userDispatch = useUserDispatch();
  const { symbols, favorites, top10news } = useUserState();

  const uname = faker.datatype.uuid();
  const eventStandard = process.env.REACT_APP_EVENT_STANDARD || 'EVENT-BAR-TRADE-ADD';

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
            <RealtimeList room={eventStandard} username={uname} />
            // <User
            //   symbols={realtimes}
            //   favorites={favorites}
            //   userDispatch={userDispatch}
            //   translation={RT_TRANSLATION}
            //   tableHead={RT_TABLE_HEAD}
            //   explainers={RT_EXPLAINERS}
            //   rowContent={RT_ROW}
            //   pageType="REALTIME"
            // />
          )
        },
        { path: 'news', element: <PageTop10News newsList={top10news} /> },
        {
          path: 'expert',
          element: <Expert />
        },
        { path: 'products', element: <Products videolist={PRODUCTS} name="Videos" /> },
        { path: 'tutorials', element: <Products videolist={TUTORIALS} name="Tutorials" /> },
        { path: 'blog', element: <Blog /> },
        { path: 'stripe-success', element: <STRIPE_SUCCESS /> },
        { path: 'stripe-cancel', element: <STRIPE_CANCEL /> },
        { path: 'account', element: <ACCOUNT /> },
        { path: 'schedule', element: <PageScheduleCalendar /> },
        { path: 'channels', element: <EXPERTCHANNELS /> }
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

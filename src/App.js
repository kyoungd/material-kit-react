// routes
import Router from './routes';
// import RouterAuthenticated from './routerAuthenticated';
// import RouterUnauthenticatd from './routerUnauthenticated';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
// context
// import { CookieUserAuthenticated } from './utils/cookies';
// import { useUserState } from './components/UserContext';

// ----------------------------------------------------------------------

export default function App() {
  // global
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}

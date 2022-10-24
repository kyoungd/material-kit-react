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

// integrate with discord server api to create a new user
// https://discord.com/developers/docs/resources/user#create-user
// https://discord.com/developers/docs/resources/user#modify-current-user-json-params
// https://discord.com/developers/docs/resources/user#get-current-user
// https://discord.com/developers/docs/resources/user#get-user
// https://discord.com/developers/docs/resources/user#get-current-user-guilds
// https://discord.com/developers/docs/resources/user#get-user-connections
// https://discord.com/developers/docs/resources/user#get-current-user-connections
// https://discord.com/developers/docs/resources/user#get-user-voice-connections
// https://discord.com/developers/docs/resources/user#modify-current-user
// https://discord.com/developers/docs/resources/user#modify-current-user-json-params
// https://discord.com/developers/docs/resources/user#modify-current-user-voice-state
// https://discord.com/developers/docs/resources/user#modify-current-user-voice-state-json-params
// https://discord.com/developers/docs/resources/user#modify-current-user-nickname
// https://discord.com/developers/docs/resources/user#modify-current-user-nickname-json-params
// https://discord.com/developers/docs/resources/user#modify-current-user-voice-state
// https://discord.com/developers/docs/resources/user#modify-current-user-voice-state-json-params

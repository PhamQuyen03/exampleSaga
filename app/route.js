import { Navigation } from 'react-native-navigation';
import Login from './components/Login';
import Register from './components/Register';
import News from './components/News';
import Personal from './components/Personal';
import Video from './components/Video';
import InitScreen from './InitScreen';

const screens = [
  {
    id: 'Login',
    screen: Login,
  },
  {
    id: 'Register',
    screen: Register,
  },
  {
    id: 'InitScreen',
    screen: InitScreen,
  },
  {
    id: 'News',
    screen: News,
  },
  {
    id: 'Personal',
    screen: Personal,
  },
  {
    id: 'Video',
    screen: Video,
  },
];

async function registerScreens(configStore, Provider) {
  const store = await configStore();

  screens.forEach(({ id, screen }) =>
    Navigation.registerComponentWithRedux(
      id,
      () => screen,
      Provider,
      store
    )
  );
}

export default registerScreens;

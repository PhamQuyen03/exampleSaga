import { Navigation } from 'react-native-navigation';
import mainTabs from './components/AppNavigator/mainTabs';

export const rootNavigatorApp = () => Navigation.setRoot({
  root: {
    sideMenu: {
      center: {
        bottomTabs: mainTabs,
      },
    },
  },
});

export const startApp = () => Navigation.setRoot({
  root: {
    stack: {
      children: [
        {
          component: {
            name: 'Register',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              },
            },
          },
        },
        {
          component: {
            name: 'Login',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              },
            },
          },
        },
      ],
    },
  },
});


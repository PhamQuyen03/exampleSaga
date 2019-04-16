/** @format */
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import registerScreens from './route';
import configStore from './store';

registerScreens(configStore, Provider);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'InitScreen',
      },
    },
  });
});

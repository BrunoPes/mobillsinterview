import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import CreateExpense from '../pages/home/CreateExpense';
import CreateIncome from '../pages/home/CreateIncome';

const AuthStack = createStackNavigator({
  Login,
  Register
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: ({ navigation }) => ({
    header: null,
  })
});

const AppStack = createStackNavigator({
  Home,
  CreateExpense,
  CreateIncome,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: ({ navigation }) => ({
    header: null,
  })
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Auth: AuthStack,
    Home: AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

export default AppContainer;
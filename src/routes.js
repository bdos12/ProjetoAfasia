import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';

//Import de páginas da aplicação
import HomePage from './pages/Home/index'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: "Inicio"
      },
      titleStyle:{
        fontSize: 40,
      },
      headerStyle: {
        backgroundColor: '#b8daf5',
      },
    },
  },
  {
  initialRouteName: 'Home'
  }
);

const Routes = createAppContainer(AppNavigator);

export default Routes;
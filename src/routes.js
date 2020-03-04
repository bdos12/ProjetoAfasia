import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';

//Import de páginas da aplicação
import HomePage from './pages/Home/index'
import AddImagePage from './pages/AddImage/index'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage
    },
    AddImage:{
      screen: AddImagePage
    }
  },
  {
  initialRouteName: 'Home'
  }
);

const Routes = createAppContainer(AppNavigator);

export default Routes;
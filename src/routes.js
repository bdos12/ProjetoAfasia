import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack';

//Import de páginas da aplicação
import HomePage from './pages/Home/index'
// import AddCategoryPage from './pages/AddCategory/index'
import AddImagePage from './pages/AddImage/index'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage
    },
    // AddCategory:{
    //   screen: AddCategoryPage
    // },
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
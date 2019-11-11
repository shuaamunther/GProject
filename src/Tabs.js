import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FeedScreen from "./FeedScreen";
import ProfileScreen from './ProfileScreen';
import SearchScreen from "./SearchScreen";

const TabNavigator = createBottomTabNavigator({
    Home: FeedScreen,
    Profile: ProfileScreen,
    Search:SearchScreen,
  });
  
  export default withNavigation(createAppContainer(TabNavigator));
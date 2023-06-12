import React from 'react';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { auth } from './firebase';
import globalStyles from './src/const/globalStyle';
import { Provider } from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware} from 'redux'
import rootReducer from './src/components/redux/reducers'
import thunk from 'redux-thunk'
import Main from './src/components/main/MainNavigator'
import AuthNavigation from './src/components/navigation/AuthNavigation';
import BadgeScreen from './src/components/main/BadgeScreen';
import AddScreen from './src/components/main/AddScreen';

const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createNativeStackNavigator()

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    Broadway: require('./assets/fonts/broadway-normal.ttf'),
    HongKongLight: require('./assets/fonts/HongKong-Light.otf'),
    HongKongRegular: require('./assets/fonts/HongKong-Regular.otf')
  });

  return fontsLoaded ? children : null;
};

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded} = this.state
    if(!loaded){
      return(
        <View style={[globalStyles.center, globalStyles.fullScreen]}>
          <Text>
            Loading
          </Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <AuthNavigation/>
      );
    }else{
      return(
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='AddScreen' component={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    
  }
}

const AppWithFonts = () => (
  <Provider store={store}>
    <FontLoader>
      <App />
    </FontLoader>
  </Provider>
);

export default AppWithFonts;

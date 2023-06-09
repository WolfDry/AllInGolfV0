import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Landing from './src/components/auth/Landing';

export default function App() {

  const Stack = createNativeStackNavigator() 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Landing' component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
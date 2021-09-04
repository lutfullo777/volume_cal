import React from 'react';
import Head from './components/head';
import Woods from './components/woods';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Head"
          screenOptions={{
            headerMode: 'screen',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#28C8FF'},
          }}>
          <Stack.Screen name="Head" component={Head} />
          <Stack.Screen name="Woods" component={Woods} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

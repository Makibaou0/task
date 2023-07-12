import {View, Text, LogBox} from 'react-native';
import React from 'react';
import {NativeBaseProvider, StatusBar, extendTheme} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Splash from './src/pages/Splash';
import Detail from './src/pages/Detail';

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      200: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic',
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic',
      },
      500: {
        normal: 'Poppins-Medium',
      },
      600: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic',
      },

      700: {
        normal: 'Poppins-Bold',
      },
      800: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
      900: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins',
  },
});
const Stack = createNativeStackNavigator();
const HomeScreen = route => {
  return <Home route={route} />;
};
const SplashScreen = route => {
  return <Splash route={route} />;
};
const LoginScreen = route => {
  return <Login route={route} />;
};
const DetailScreen = route => {
  return <Detail route={route} />;
};
const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <StatusBar barStyle={'light-content'} />

        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;

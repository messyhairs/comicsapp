// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createStackNavigator } from '@react-navigation/stack';
// import About from './Screens/about.js';
// import Home from './Screens/home.js';
// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <About />
//     </View>
//   );
// }

// function Article() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Home />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="About" component={Feed} />
//       <Drawer.Screen name="Home" component={Article} />
//     </Drawer.Navigator>
//   );
// }

// export default function Mainscreen() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }


import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/splashscreen';
import LoginScreen from './Screens/loginscreen';
import RegisterScreen from './Screens/registerscreen';
import EditScreen from './Screens/editscreen';
import Userprofiles from './Screens/userprofiles';
import DrawerNavigationRoutes from './Screens/drawernavigation';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (

    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'create your account', //Set Header Title
          headerStyle: {
            backgroundColor: '#00334e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          // headerTitleStyle: {
          //   fontWeight: 'bold', //Set Header text style
          // },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [hidden, setHidden] = useState(false);

  return (

    <NavigationContainer>
      <StatusBar
        hidden />
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Edit your Blog"
          component={EditScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Profiles"
          component={Userprofiles}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
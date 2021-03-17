import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import About from './about.js';
import Home from './home.js';
import NavigationDrawerHeader from './drawerheader';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const AboutScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="AboutScreen">
            <Stack.Screen
                name="AboutScreen"
                component={Home}
                options={{
                    title: 'All blogs', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    // headerTitleStyle: {
                    //     fontWeight: 'bold', //Set Header text style
                    // },
                }}
            />
        </Stack.Navigator>
    );
};

const settingScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="AboutScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="settingScreenStack"
                component={About}
                options={{
                    title: 'about', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};


const Mainscreen = (props) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="AboutScreenStack"
                options={{ drawerLabel: 'home' }}
                component={AboutScreenStack}
            />
            <Drawer.Screen
                name="settingScreenStack"
                options={{ drawerLabel: 'about' }}
                component={settingScreenStack}
            />
        </Drawer.Navigator>
    );
};
const styles = StyleSheet.create({
    navwidth: {
        color: 'red'
    }
})
export default Mainscreen;
import {AntDesign} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {RootStackParamList, RootTabParamList} from './types';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/(tabs)/HomeScreen';
import SignIn from '../screens/(auth)/SignIn';
import SignUp from '../screens/(auth)/SignUp';


export default function Navigation({loggedIn}: {loggedIn: boolean}) {
    return (
        <NavigationContainer theme={DefaultTheme}>
            {loggedIn ? (
                <RootNavigator />
            ) : (
                <Stack.Navigator initialRouteName="LandingPage">
                    <Stack.Screen
                        name="LandingPage"
                        component={LandingScreen}
                        options={{headerShown: false, gestureEnabled: false}}
                    />
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{headerShown: false, gestureEnabled: false}}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={{headerShown: false, gestureEnabled: false}}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
// create a composite navigator




function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{headerShown: false, gestureEnabled: false}}
            />
        </Stack.Navigator>
    );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="TabOne">
            <BottomTab.Screen
                name="TabOne"
                component={HomeScreen}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({color}) => <AntDesign name="home" size={24} color={color}/>
                })}
            />
        </BottomTab.Navigator>
    );
}



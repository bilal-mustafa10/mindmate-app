import {AntDesign} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer,} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {RootStackParamList, RootTabParamList} from './types';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/(tabs)/HomeScreen';


export default function Navigation() {
    return (
        <NavigationContainer
            theme={DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen
                name="LandingPage"
                component={LandingScreen}
                options={{headerShown: false, gestureEnabled: false}}
            />
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



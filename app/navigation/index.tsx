import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {RootStackParamList, RootTabParamList} from './types';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/(tabs)/HomeScreen';
import SignIn from '../screens/(auth)/SignIn';
import SignUp from '../screens/(auth)/SignUp';


export default function Navigation() {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <RootNavigator/>
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
        <Stack.Navigator initialRouteName={'LandingPage'}>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{headerShown: false, gestureEnabled: false}}
            />
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
    );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ route }: { route: any }) {
    const routeName = getFocusedRouteNameFromRoute(route);

    const activeTabLabelStyle = {
        fontSize: 13,
        fontFamily: 'outfit-semibold',
    };

    const inactiveTabLabelStyle = {
        fontSize: 13,
        fontFamily: 'outfit-regular',
    };

    return (
        <BottomTab.Navigator
            initialRouteName="MindMate"
            screenOptions={{
                tabBarActiveTintColor: '#5539A8',
                tabBarInactiveTintColor: '#000',
                tabBarStyle: {
                    borderRadius: 20,
                    padding: 5,
                    height: 95,
                    backgroundColor: '#fff',
                    borderTopColor: '#fff',

                },
                tabBarLabelStyle: inactiveTabLabelStyle,
                tabBarLabelPosition: 'below-icon',
            }}
        >
            <BottomTab.Screen
                name="MindMate"
                component={HomeScreen}
                options={(props) => ({
                    headerShown: true,
                    tabBarLabelStyle: routeName === 'MindMate'? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color}) => <Ionicons name={(routeName === 'MindMate'? 'cloud': 'cloud-outline')} size={28} color={color}/>

                })}
            />
            <BottomTab.Screen
                name="Activities"
                component={HomeScreen}
                options={() => ({
                    headerShown: true,
                    tabBarLabelStyle: routeName === 'Activities'? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color}) => <Ionicons name={(routeName === 'Activities'? 'compass': 'compass-outline')} size={28} color={color}/>
                })}
            />
            <BottomTab.Screen
                name="Hub"
                component={HomeScreen}
                options={() => ({
                    headerShown: true,
                    tabBarLabelStyle: routeName === 'Hub'? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color}) => <Ionicons name={(routeName === 'Hub'? 'people': 'people-outline')} size={28} color={color}/>
                })}
            />
            <BottomTab.Screen
                name="Mindverse"
                component={HomeScreen}
                options={() => ({
                    headerShown: true,
                    tabBarLabelStyle: routeName === 'Mindverse'? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color}) => <Ionicons name={(routeName === 'Mindverse'? 'heart': 'heart-outline')} size={28} color={color}/>
                })}
            />
        </BottomTab.Navigator>
    );
}



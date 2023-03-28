import {Ionicons} from '@expo/vector-icons';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DefaultTheme, NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, RootTabParamList} from './types';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/(tabs)/HomeScreen';
import SignIn from '../screens/(auth)/SignIn';
import SignUp from '../screens/(auth)/SignUp';
import ActivitiesScreen from '../screens/(tabs)/ActivitiesScreen';
import HubScreen from '../screens/(tabs)/HubScreen';
import MindverseScreen from '../screens/(tabs)/MindverseScreen';
import {theme} from '../constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import ViewActivityScreen from '../screens/(activity)/ViewActivityScreen';
import ActivityCompleted from '../screens/(activity)/ActivityCompleted';
import MoodScreen from '../screens/(journal)/MoodScreen';
import MoodJournal from '../screens/(journal)/MoodJournal';

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
            <Stack.Screen
                name="ActivityCompleted"
                component={ActivityCompleted}
                options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
                name="MoodScreen"
                component={MoodScreen}
                options={{headerShown: false, gestureEnabled: false}}
            />
            <Stack.Screen
                name="MoodJournal"
                component={MoodJournal}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerRight: () => (
                        <Text style={{...theme.typography.title}}>Mood Journal</Text>
                    ),
                }}
            />
            <Stack.Screen
                name="ViewActivity"
                component={ViewActivityScreen}
                options={{headerShown: true,
                    gestureEnabled: true,
                    headerTitle: '',
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({ route }: { route: unknown }) {
    const routeName = getFocusedRouteNameFromRoute(route);
    const insets = useSafeAreaInsets();

    const activeTabLabelStyle = {
        fontSize: 13,
        fontFamily: 'outfit-semibold',
    };

    const inactiveTabLabelStyle = {
        fontSize: 13,
        fontFamily: 'outfit-regular',
    };

    const tabBarIcon = (iconName: any, focused: boolean, color: string) => (
        <Ionicons name={focused ? iconName : iconName + '-outline'} size={28} color={color} />
    );

    return (
        <BottomTab.Navigator
            initialRouteName="MindMate"
            screenOptions={{
                tabBarActiveTintColor: '#5539A8',
                tabBarInactiveTintColor: '#000',
                tabBarStyle: {
                    borderRadius: 32,
                    paddingTop: 10,
                    paddingBottom: insets.bottom - 10,
                    paddingHorizontal: 10,
                    height: 60 + insets.bottom,
                    backgroundColor: '#fff',
                    borderTopColor: '#fff',
                    marginBottom: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                },
                tabBarLabelStyle: inactiveTabLabelStyle,
                tabBarLabelPosition: 'below-icon',
            }}
        >
            <BottomTab.Screen
                name="MindMate"
                component={HomeScreen}
                options={() => ({
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontFamily: 'outfit-semibold',
                        fontSize: 24,
                        color: theme.colors.text,
                        paddingHorizontal: '5%',
                        marginBottom: 10,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    tabBarLabelStyle: routeName === 'MindMate' ? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color, focused}) => tabBarIcon('cloud', focused, color),
                    headerRightContainerStyle: {
                        paddingHorizontal: '5%',
                        marginBottom: 10,
                    },
                    headerRight: () => (
                        <FastImage source={require('../assets/images/help.png')} style={{width: 30, height: 30}} />

                    ),
                })}
            />
            <BottomTab.Screen
                name="Activities"
                component={ActivitiesScreen}
                options={() => ({
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontFamily: 'outfit-semibold',
                        fontSize: 24,
                        color: theme.colors.text,
                        paddingHorizontal: '5%',
                        marginBottom: 10,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    tabBarLabelStyle: routeName === 'Activities' ? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color, focused}) => tabBarIcon('compass', focused, color),
                    headerRightContainerStyle: {
                        paddingHorizontal: '5%',
                        marginBottom: 10,
                    },
                    headerRight: () => (
                        <FastImage source={require('../assets/images/favourite.png')} style={{width: 30, height: 30}} />

                    ),
                })}
            />
            <BottomTab.Screen
                name="Hub"
                component={HubScreen}
                options={() => ({
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontFamily: 'outfit-semibold',
                        fontSize: 24,
                        color: theme.colors.text,
                        marginBottom: 10,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    tabBarLabelStyle: routeName === 'Hub'? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color, focused}) => tabBarIcon('people', focused, color),
                })}
            />
            <BottomTab.Screen
                name="Mindverse"
                component={MindverseScreen}
                options={() => ({
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        fontFamily: 'outfit-semibold',
                        fontSize: 24,
                        color: theme.colors.text,
                        marginBottom: 10,
                    },
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    tabBarLabelStyle: routeName === 'Mindverse'? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({color, focused}) => tabBarIcon('heart', focused, color),
                })}
            />
        </BottomTab.Navigator>
    );
}



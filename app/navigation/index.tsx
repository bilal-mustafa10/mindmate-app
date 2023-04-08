import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from './types';
import LandingScreen from '../screens/LandingScreen';
import HomeScreen from '../screens/(tabs)/HomeScreen';
import SignIn from '../screens/(auth)/SignIn';
import SignUp from '../screens/(auth)/SignUp';
import ActivitiesScreen from '../screens/(tabs)/ActivitiesScreen';
import HubScreen from '../screens/(tabs)/HubScreen';
import MindverseScreen from '../screens/(tabs)/MindverseScreen';
import { theme } from '../constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewActivityScreen from '../screens/(activity)/ViewActivityScreen';
import ActivityCompleted from '../screens/(activity)/ActivityCompleted';
import AddMoodScreen from '../screens/(journal)/AddMoodScreen';
import MoodJournal from '../screens/(journal)/MoodJournal';
import SelfReflectionJournal from '../screens/(journal)/SelfReflectionJournal';
import EditShortcutsScreen from '../screens/(shortcuts)/EditShortcuts';
import IntroductionScreen from '../screens/(auth)/IntroductionScreen';
import AddReflectionScreen from '../screens/(journal)/AddReflectionScreen';
import AllResourcesScreen from '../screens/(resources)/AllResourcesScreen';
import ViewResourceScreen from '../screens/(resources)/ViewResourceScreen';
import ProfileScreen from '../screens/(profile)/ProfileScreen';

export default function Navigation() {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <RootNavigator />
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
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
                name="LandingPage"
                component={LandingScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen
                name="Introduction"
                component={IntroductionScreen}
                options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="ActivityCompleted"
                component={ActivityCompleted}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="MoodScreen"
                component={AddMoodScreen}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="ReflectionScreen"
                component={AddReflectionScreen}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="AllResources"
                component={AllResourcesScreen}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="ViewResource"
                component={ViewResourceScreen}
                options={{ headerShown: false, gestureEnabled: true }}
            />

            <Stack.Screen
                name="MoodJournal"
                component={MoodJournal}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="SelfReflectionJournal"
                component={SelfReflectionJournal}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="ViewActivity"
                component={ViewActivityScreen}
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="EditShortcuts"
                component={EditShortcutsScreen}
                options={{
                    headerShown: false,
                    gestureEnabled: true,
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
        ...theme.typography.BodyBold,
        fontSize: 12,
    };

    const inactiveTabLabelStyle = {
        ...theme.typography.Body,
        fontSize: 10,
    };

    const tabBarIcon = (iconName: any, focused: boolean, color: string) => (
        <Ionicons name={focused ? iconName : iconName + '-outline'} size={28} color={color} />
    );

    return (
        <BottomTab.Navigator
            initialRouteName="MindMate"
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: '#000',
                tabBarStyle: {
                    paddingTop: 10,
                    paddingBottom: insets.bottom - 10,
                    paddingHorizontal: 10,
                    height: 55 + insets.bottom,
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
                    headerShown: false,
                    tabBarLabelStyle: routeName === 'MindMate' ? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({ color, focused }) => tabBarIcon('cloud', focused, color),
                })}
            />
            <BottomTab.Screen
                name="Activities"
                component={ActivitiesScreen}
                options={() => ({
                    headerShown: false,
                    tabBarLabelStyle: routeName === 'Activities' ? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({ color, focused }) => tabBarIcon('compass', focused, color),
                })}
            />
            <BottomTab.Screen
                name="Hub"
                component={HubScreen}
                options={() => ({
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    tabBarLabelStyle: routeName === 'Hub' ? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({ color, focused }) => tabBarIcon('people', focused, color),
                })}
            />
            <BottomTab.Screen
                name="Mindverse"
                component={MindverseScreen}
                options={() => ({
                    headerShown: false,
                    tabBarLabelStyle: routeName === 'Mindverse' ? activeTabLabelStyle : inactiveTabLabelStyle,
                    tabBarIcon: ({ color, focused }) => tabBarIcon('heart', focused, color),
                })}
            />
        </BottomTab.Navigator>
    );
}

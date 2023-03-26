/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityResults} from '../services/redux/activitySlice';

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    LandingPage: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ActivityCompleted: undefined;
    MoodScreen: undefined;
    ViewActivity: { activity: ActivityResults};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

export type RootTabParamList = {
    MindMate: undefined;
    Activities: undefined;
    Hub: undefined;
    Mindverse: undefined;
};



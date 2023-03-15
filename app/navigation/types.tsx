/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    LandingPage: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
    TabThree: undefined;
    TabFour: undefined;
};



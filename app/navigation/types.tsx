/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityResults } from '../services/redux/activitySlice';
import { ResourcesResult } from '../services/redux/resourcesSlice';

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    LandingPage: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Profile: { id: number; firstName: string; lastName: string; avatarColor: string };
    ActivityCompleted: undefined;
    MoodScreen: undefined;
    ReflectionScreen: undefined;
    MoodJournal: undefined;
    AddReflectionScreen: undefined;
    SelfReflectionJournal: undefined;
    AllResources: undefined;
    ViewResource: { resource: ResourcesResult; title: string };
    EditShortcuts: undefined;
    Introduction: { userId: string };
    ViewActivity: { activity: ActivityResults; isCompleted: boolean };
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

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityResults } from '../services/redux/activitySlice';
import { ResourcesResult } from '../services/redux/resourcesSlice';
import { AssessmentData } from '../services/redux/assessmentSlice';
import { IScoreResult } from '../constants/AssessmentScoreCalculator';

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    LandingPage: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Profile: { id: number; firstName: string; lastName: string; avatarColor: string };
    ActivityCompleted: undefined;
    AssessmentCompleted: { results: IScoreResult };
    MoodScreen: undefined;
    ReflectionScreen: undefined;
    MoodJournal: undefined;
    AddReflectionScreen: undefined;
    SelfReflectionJournal: undefined;
    AllResources: undefined;
    ViewResource: { resource: ResourcesResult; title: string };
    ViewAssessment: { assessment: AssessmentData; title: string };
    AssessmentInfo: { assessment: AssessmentData; title: string };
    EditShortcuts: undefined;
    EmergencyScreen: undefined;
    Introduction: { userId: number };
    ViewActivity: { activity: ActivityResults; isCompleted: boolean };
    DailyResource: undefined;
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

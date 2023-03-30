import {RootStackParamList} from '../navigation/types';

export interface IShortcut {
    id: number,
    name: string;
    logo: any;
    navigateTo: keyof RootStackParamList;
}

export const shortcuts: IShortcut[] = [
    {
        id: 1,
        name: 'Moodify Your Journal',
        logo: require('../assets/images/shortcuts/add-mood.png'),
        navigateTo: 'Root'
    },
    {
        id: 2,
        name: 'Daily Mental Health Boost',
        logo: require('../assets/images/shortcuts/mental-health-boost.png'),
        navigateTo: 'Root'
    },
    {
        id: 3,
        name: 'Mindfulness',
        logo: require('../assets/images/shortcuts/mindfulness.png'),
        navigateTo: 'Root'
    },
    {
        id: 4,
        name: 'Mindfulness',
        logo: require('../assets/images/shortcuts/mindfulness.png'),
        navigateTo: 'Root'
    }
];


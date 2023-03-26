import {RootStackParamList} from '../navigation/types';

export interface IShortcut {
    name: string;
    logo: any;
    navigateTo: keyof RootStackParamList;
}

export const shortcuts: IShortcut[] = [
    {name: 'Moodify Your Journal', logo: require('../assets/images/shortcuts/add-mood.png'), navigateTo: 'Root'},
    {name: 'Daily Mental Health Boost', logo: require('../assets/images/shortcuts/mental-health-boost.png'), navigateTo: 'Root'},
    {name: 'Mindfulness', logo: require('../assets/images/shortcuts/mindfulness.png'), navigateTo: 'Root'},
    {name: 'Mindfulness', logo: require('../assets/images/shortcuts/mindfulness.png'), navigateTo: 'Root'},
];


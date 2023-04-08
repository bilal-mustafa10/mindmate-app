import { StyleSheet } from 'react-native';
import { theme } from './Theme';

export const htmlViewStyle = StyleSheet.create({
    p: {
        ...theme.typography.Text,
        letterSpacing: 0.8,
        lineHeight: 26,
    },
});

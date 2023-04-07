import { StyleSheet } from 'react-native';
import { theme } from './Theme';

export const htmlViewStyle = StyleSheet.create({
    p: {
        ...theme.typography.bodyMedium,
        letterSpacing: 0.75,
        lineHeight: 24,
    },
});

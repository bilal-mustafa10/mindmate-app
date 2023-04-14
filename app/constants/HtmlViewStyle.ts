import { StyleSheet } from 'react-native';
import { theme } from './Theme';

export const htmlViewStyle = StyleSheet.create({
    b: {
        ...theme.typography.TextSemiBold,
        letterSpacing: 0.8,
        lineHeight: 26,
    },
    p: {
        ...theme.typography.Text,
        letterSpacing: 0.8,
        lineHeight: 26,
    },
});

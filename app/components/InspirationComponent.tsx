import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/Theme';

interface InspirationBoxComponentProps {
    inspiration: string;
}

const InspirationBoxComponent = ({ inspiration }: InspirationBoxComponentProps) => {
    return (
        <View style={styles.boxContainer}>
            <Text style={styles.inspirationText}>{inspiration}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 20,
        borderWidth: 1,
        elevation: 1,
        height: 130,
        justifyContent: 'center',
        padding: theme.spacing.large,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    inspirationText: {
        ...theme.typography.bodySemiBold,
        textAlign: 'center',
    },
});

export default InspirationBoxComponent;

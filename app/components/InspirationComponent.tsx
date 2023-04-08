import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/Theme';

interface InspirationBoxComponentProps {
    quote: string;
    author?: string;
}

const InspirationBoxComponent = ({ quote, author }: InspirationBoxComponentProps) => {
    if (author) {
        const [name, source] = author.split(', ');
        return (
            <View style={styles.boxContainer}>
                <Text style={styles.inspirationText}>{quote}</Text>
                <Text style={styles.authorText}>
                    {name} - {source}
                </Text>
            </View>
        );
    } else {
        return (
            <View style={styles.boxContainer}>
                <Text style={styles.inspirationText}>{quote}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    authorText: {
        ...theme.typography.Caption,
        textAlign: 'right',
    },
    boxContainer: {
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 15,
        borderWidth: 0.5,
        elevation: 1,
        justifyContent: 'center',
        maxHeight: 180,
        minHeight: 150,
        padding: theme.spacing.large,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    inspirationText: {
        ...theme.typography.BodyMedium,
        paddingBottom: '5%',
        textAlign: 'center',
    },
});

export default InspirationBoxComponent;

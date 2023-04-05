import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../constants/Theme';

interface InspirationBoxComponentProps {
    inspiration: string;
}

const InspirationBoxComponent = ({inspiration}: InspirationBoxComponentProps) => {
    return (
        <View style={styles.boxContainer}>
            <Text style={styles.inspirationText}>{inspiration}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    boxContainer: {
        padding: theme.spacing.large,
        backgroundColor:'white',
        borderColor: theme.colors.borderColor,
        borderWidth: 1,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        height: 130,
        justifyContent: 'center',
    },
    inspirationText: {
        ...theme.typography.bodySemiBold,
        textAlign: 'center',
    },
});

export default InspirationBoxComponent;

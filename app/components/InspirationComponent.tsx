import {View, Text, StyleSheet} from 'react-native';

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
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1, // Only needed for Android to support boxShadow
        marginBottom: 15,
        height: 130,
        justifyContent: 'center',
    },
    inspirationText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'outfit-regular',
        lineHeight: 22,
        letterSpacing: 0.5
    },
});

export default InspirationBoxComponent;

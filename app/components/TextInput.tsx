import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/Theme';

interface CustomTextInputProps {
    placeholder?: string;
    data?: string;
    onDataChange?: (text: string) => void;
    type: 'medium' | 'large';
    inputPurpose: 'inspiration' | 'moodLog' | 'selfReflection';
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    data,
    onDataChange,
    type,
    inputPurpose,
    ...props
}) => {
    const [wordCount, setWordCount] = React.useState<number>(0);

    const handleChange = (text: string) => {
        const currentWordCount = countWords(text);
        setWordCount(currentWordCount);
        if (onDataChange && currentWordCount <= getWordLimit(inputPurpose)) {
            onDataChange(text);
        }
    };

    const countWords = (str: string) => {
        return str.trim().split(/\s+/).length;
    };

    const getWordLimit = (inputPurpose: 'inspiration' | 'moodLog' | 'selfReflection') => {
        switch (inputPurpose) {
            case 'inspiration':
                return 30;
            case 'moodLog':
                return 50;
            case 'selfReflection':
            default:
                return 100;
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={data}
                onChangeText={handleChange}
                style={[styles.textInput, type === 'large' ? styles.largeInput : styles.mediumInput]}
                multiline={true}
                textAlignVertical="top"
                placeholder={placeholder ? placeholder : 'Enter text here'}
                {...props}
            />
            <Text style={[styles.wordCount, wordCount > getWordLimit(inputPurpose) ? styles.wordCountExceeded : null]}>
                {wordCount}/{getWordLimit(inputPurpose)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
    },
    largeInput: {
        height: 200,
    },
    mediumInput: {
        height: 150,
    },
    textInput: {
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 12,
        borderWidth: 1,
        ...theme.typography.Text,
        paddingTop: '4%',
        padding: '5%',
        width: '100%',
    },
    wordCount: {
        ...theme.typography.Text,
        alignSelf: 'flex-end',
        marginVertical: '2%',
    },
    wordCountExceeded: {
        color: theme.colors.error,
    },
});

export default CustomTextInput;

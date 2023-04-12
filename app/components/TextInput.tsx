import React from 'react';
import { View, TextInput, Text, StyleSheet, Keyboard, LayoutAnimation } from 'react-native';
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
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const textInputRef = React.useRef<TextInput>(null);

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

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    const handleKeyboardShow = (event: any) => {
        const keyboardHeight = event.endCoordinates.height;
        const textInputBottomPosition = textInputRef.current
            ? textInputRef.current.measure((x, y, width, height, pageX, pageY) => pageY + height)
            : 0;
        const screenBottomPosition = event.endCoordinates.screenY;
        setIsFocused(textInputBottomPosition > screenBottomPosition - keyboardHeight);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const handleKeyboardHide = () => {
        setIsFocused(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={data}
                onChangeText={handleChange}
                style={[
                    styles.textInput,
                    type === 'large' ? styles.largeInput : styles.mediumInput,
                    isFocused && styles.focusedInput,
                ]}
                multiline={true}
                textAlignVertical="top"
                placeholder={placeholder ? placeholder : 'Enter text here'}
                ref={textInputRef}
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
    focusedInput: {
        marginBottom: 100, // Adjust this to your liking
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

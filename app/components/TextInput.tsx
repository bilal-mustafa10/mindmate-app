import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface CustomTextInputProps {
    data?: string;
    onDataChange?: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({data, onDataChange, ...props }) => {
    const handleChange = (text: string) => {
        if (onDataChange) {
            onDataChange(text);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={data}
                onChangeText={handleChange}
                style={styles.textInput}
                multiline={true} // Enable multiline
                textAlignVertical="top" // Set text alignment to top
                {...props}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
    },
    textInput: {
        width: '100%',
        height: 100,
        backgroundColor: '#FFFFFF',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 16,
        fontFamily: 'outfit-regular'
    },
});

export default CustomTextInput;

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const CustomTextInput = (props) => {
    return (
        <View style={styles.container}>
            <TextInput
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
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 16,
    },
});

export default CustomTextInput;

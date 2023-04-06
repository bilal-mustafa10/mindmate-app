import React from 'react';
import { Modal, Pressable, View, StyleSheet } from 'react-native';
import { theme } from '../constants/Theme';

interface ColorOptionsModalProps {
    visible: boolean;
    handleColorChange: (color: string) => void;
    selectedColor: string;
}

const ColorOptionsModal: React.FC<ColorOptionsModalProps> = ({ visible, handleColorChange, selectedColor }) => {
    const colors = [theme.colors.tertiary, theme.colors.primary, theme.colors.secondary, theme.colors.error];

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={style.modalContainer}>
                <View style={style.modalContent}>
                    <View style={style.colorsContainer}>
                        {colors.map((color) => (
                            <Pressable
                                key={color}
                                style={[
                                    style.colorSquare,
                                    { backgroundColor: color },
                                    selectedColor === color ? style.selectedColor : {},
                                ]}
                                onPress={() => handleColorChange(color)}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const style = StyleSheet.create({
    colorSquare: {
        borderRadius: 20,
        height: 50,
        margin: 10,
        width: 50,
    },
    colorsContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalContainer: {
        backgroundColor: theme.colors.text,
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        height: '15%',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    selectedColor: {
        borderColor: theme.colors.borderColor,
        borderRadius: 20,
        borderWidth: 4,
    },
});

export default ColorOptionsModal;

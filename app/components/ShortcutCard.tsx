import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { theme } from '../constants/Theme';
import { IShortcut } from '../constants/Shortcuts';

interface ShortcutCardProps {
    shortcut: IShortcut;
    isAdd: boolean;
    onAction: (id: number) => void;
}

export const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut, isAdd, onAction }) => {
    return (
        <View style={styles.shortcutCard}>
            <Text style={theme.typography.Text}>{shortcut.name}</Text>
            <Button
                type="pill"
                onPress={() => {
                    onAction(shortcut.id);
                }}
                color={isAdd ? 'secondary' : 'error'}
            >
                {isAdd ? 'Add' : 'Remove'}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    shortcutCard: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 15,
        borderWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        padding: 10,
    },
});

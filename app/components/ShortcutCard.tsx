import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { theme } from '../constants/Theme';
import {IShortcut} from '../constants/Shortcuts';

interface ShortcutCardProps {
    shortcut: IShortcut;
    isAdd: boolean;
    onAction: (id: number) => void;
}

export const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut, isAdd, onAction }) => {
    return (
        <View style={styles.shortcutCard}>
            <Text style={theme.typography.bodyMedium}>{shortcut.name}</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: 'white',
        borderColor: theme.colors.borderColor,
        borderWidth: 0.5,
    },
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import {theme} from '../constants/Theme';

interface ShortcutCardProps {
    shortcut: any;
    isAdd: boolean;
    onAction: (id: number) => void;
}

export const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut, isAdd, onAction }) => {
    return (
        <View style={styles.shortcutCard}>
            <Text style={theme.typography.body}>{shortcut.name}</Text>
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
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    shortcutText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from './Card';
import { theme } from '../constants/Theme';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IShortcut } from '../constants/Shortcuts';

interface ShortcutsProps {
    shortcuts: IShortcut[];
    navigation: NativeStackNavigationProp<RootStackParamList, 'Root'>;
}

const ShortcutComponent = ({ shortcuts, navigation }: ShortcutsProps) => {
    const shortcutsToDisplay = shortcuts.slice(0, 3);

    if (shortcutsToDisplay.length === 0) {
        return (
            <View style={styles.emptyShortcutContainer}>
                <Text style={theme.typography.Caption}>No shortcuts.</Text>
            </View>
        );
    }

    return (
        <View style={styles.shortcutsContainer}>
            {shortcutsToDisplay.map((shortcut, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate(shortcut.navigateTo)}>
                    <Card
                        type={'small'}
                        key={index}
                        photo={shortcut.logo}
                        title={shortcut.name}
                        borderColor={theme.card_theme[index]}
                    />
                </TouchableOpacity>
            ))}

            {shortcuts.length === 0 && <Text style={theme.typography.Body}>No shortcuts.</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    emptyShortcutContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.secondaryBackground,
        borderRadius: 15,
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
    },
    shortcutsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
});

export default ShortcutComponent;

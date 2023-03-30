import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { shortcuts } from '../../constants/Shortcuts';
import { RealmContext } from '../../services/realm/config';
import {ShortcutCard} from '../../components/ShortcutCard';
import {styles, theme} from '../../constants/Theme';


const { useRealm, useQuery } = RealmContext;
export default function EditShortcutsScreen() {
    const userShortcutsData = useQuery('UserShortcut');
    const insets = useSafeAreaInsets();
    const realm = useRealm();
    const [availableShortcuts, setAvailableShortcuts] = useState(shortcuts);
    const [userShortcuts, setUserShortcuts] = useState([]);

    useEffect(() => {
        const newUserShortcuts = shortcuts.filter((shortcut) =>
            userShortcutsData.some((userShortcut) => userShortcut['shortcut_id'] === shortcut.id)
        );

        const remainingShortcuts = shortcuts.filter((shortcut) => !newUserShortcuts.includes(shortcut));

        setUserShortcuts(newUserShortcuts);
        setAvailableShortcuts(remainingShortcuts);
    }, [userShortcutsData]);

    const handleAddUserShortcut = (id) => {
        realm.write(() => {
            const userShortcut = {
                _id: new Realm.BSON.UUID(),
                shortcut_id: id,
            };
            realm.create('UserShortcut', userShortcut);
        });
    };

    const handleRemoveUserShortcut = (id) => {
        realm.write(() => {
            const userShortcut = userShortcutsData.find((userShortcut) => userShortcut['shortcut_id'] === id);
            realm.delete(userShortcut);
        });
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top * 1.75 }]}>
            <View>
                <Text style={theme.typography.subTitle}>My Shortcuts</Text>
                {userShortcuts.map((shortcut) => (
                    <ShortcutCard key={shortcut.id} shortcut={shortcut} isAdd={false} onAction={handleRemoveUserShortcut} />
                ))}
            </View>
            <View>
                <Text style={theme.typography.subTitle}>Available Shortcuts</Text>
                {availableShortcuts.map((shortcut) => (
                    <ShortcutCard key={shortcut.id} shortcut={shortcut} isAdd={true} onAction={handleAddUserShortcut} />
                ))}
            </View>
        </View>
    );
}



import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { shortcuts } from '../../constants/Shortcuts';
import { RealmContext } from '../../services/realm/config';
import { ShortcutCard } from '../../components/ShortcutCard';
import { styles } from '../../constants/Theme';
import SectionHeader from '../../components/SectionHeader';
import Header from '../../components/Header';
import { RootStackScreenProps } from '../../navigation/types';

const { useRealm, useQuery } = RealmContext;
export default function EditShortcutsScreen({ navigation }: RootStackScreenProps<'EditShortcuts'>) {
    const userShortcutsData = useQuery('UserShortcut');
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
        <>
            <Header
                showAvatar={false}
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={'Edit Shortcuts'}
                showBackButton={true}
            />
            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal]} showsVerticalScrollIndicator={false}>
                <View>
                    <SectionHeader title="My Shortcuts" />
                    {userShortcuts.map((shortcut) => (
                        <ShortcutCard
                            key={shortcut.id}
                            shortcut={shortcut}
                            isAdd={false}
                            onAction={handleRemoveUserShortcut}
                        />
                    ))}
                </View>
                <View>
                    <SectionHeader title="Available Shortcuts" />
                    {availableShortcuts.map((shortcut) => (
                        <ShortcutCard
                            key={shortcut.id}
                            shortcut={shortcut}
                            isAdd={true}
                            onAction={handleAddUserShortcut}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    );
}

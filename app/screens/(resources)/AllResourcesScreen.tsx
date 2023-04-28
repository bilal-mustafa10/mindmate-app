import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '../../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import { styles, theme } from '../../constants/Theme';
import { View } from '../../components/Themed';
import Card from '../../components/Card';
import Header from '../../components/Header';

export default function AllResourcesScreen({ navigation }: RootStackScreenProps<'AllResources'>) {
    const { results } = useSelector((state: RootState) => state.resources);

    return (
        <>
            <Header
                onHeaderLeftPress={() => {
                    navigation.goBack();
                }}
                title={'All Resources'}
                showBackButton={true}
            />
            <ScrollView style={[styles.mainContainer, styles.paddingHorizontal]}>
                <View style={styles.allResourcesContainer}>
                    {results &&
                        results.length > 0 &&
                        results.map((resource, index) => {
                            return (
                                <TouchableOpacity
                                    key={resource.id}
                                    onPress={() =>
                                        navigation.navigate('ViewResource', {
                                            resource: resource,
                                            title: resource.title,
                                        })
                                    }
                                    style={styles.allResourcesCardContainer}
                                >
                                    <Card
                                        key={resource.id}
                                        type={'large'}
                                        borderColor={theme.card_theme[index % 3]}
                                        logo={resource.logo}
                                        title={resource.title}
                                        isCompleted={false}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </ScrollView>
        </>
    );
}

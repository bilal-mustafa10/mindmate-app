import React from 'react';
import {ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';
import {styles, theme} from '../../constants/Theme';
import {View} from '../../components/Themed';
import Card from '../../components/Card';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


export default function AllResourcesScreen({ navigation }: RootStackScreenProps<'AllResources'>) {
    const {results} = useSelector((state: RootState) => state.resources);
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth - 40) / 3; // Adjust the number according to your desired margin/padding

    return (
        <>
            <ScrollView style={[styles.container, {paddingTop: insets.top * 1.75}]}>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: 'transparent'

                    }}
                >
                    {results && results.length > 0 && results.map((resource, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('ViewResource', {resource: resource, title: resource.title})}
                                style={{width: cardWidth, backgroundColor: 'transparent', marginVertical: 10}}
                            >
                                <Card
                                    key={index}
                                    type={'small'}
                                    borderColor={theme.card_theme[index % 3]}
                                    logo={resource.logo}
                                    title={resource.title}
                                    isCompleted={false}
                                />
                            </TouchableOpacity>
                        );})}
                </View>
            </ScrollView>
        </>
    );
}

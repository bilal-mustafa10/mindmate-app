import React from 'react';
import {Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';
import {styles, theme} from '../../constants/Theme';
import {View} from '../../components/Themed';
import Card from '../../components/Card';
import Header from '../../components/Header';


export default function AllResourcesScreen({ navigation }: RootStackScreenProps<'AllResources'>) {
    const {results} = useSelector((state: RootState) => state.resources);
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth - 43) / 3; // Adjust the number according to your desired margin/padding

    return (
        <>
            <Header onHeaderLeftPress={() => {navigation.goBack();}} title={'All Resources'} showBackButton={true}/>
            <ScrollView style={styles.container}>
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
                                style={{width: cardWidth, backgroundColor: 'transparent', marginVertical: 10, alignItems: 'center'}}
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

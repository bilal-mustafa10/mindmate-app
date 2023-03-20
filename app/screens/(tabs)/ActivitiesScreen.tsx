import {Text, View} from '../../components/Themed';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../services/redux/store';
import {styles} from '../../constants/Theme';

export default function ActivitiesScreen() {
    const {results} = useSelector((state: RootState) => state.activity);
    console.log('Results: ', results);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activities</Text>
            {results !== undefined && results.map((activity, index) => {
                return (
                    <View key={index}>
                        <Text>{activity.title}</Text>
                    </View>
                );
            })
            }
        </View>
    );
}


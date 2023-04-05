import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { theme, width } from '../constants/Theme';

interface StatsProps {
    value: number;
    label: string;
}

const Stats = ({ value, label }: StatsProps) => {
    return (
        <View style={styles.box}>
            <CircularProgress
                value={value}
                duration={2000}
                inActiveStrokeOpacity={0.5}
                activeStrokeWidth={5}
                inActiveStrokeWidth={5}
                activeStrokeColor={'#3960A8'}
                inActiveStrokeColor={'#C2D0EA'}
                maxValue={100}
                radius={32}
            />
            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        width: width * 0.28,
        height: 120,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column-reverse'
    },
    label: {
        marginVertical: 8,
        fontSize: 10,
        textAlign: 'center',
        ...theme.typography.captionSemiBold,
        flex: 1
    },
});


export default Stats;

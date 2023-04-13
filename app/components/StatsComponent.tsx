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
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#D9D9D9',
        borderRadius: 15,
        borderWidth: 1,
        flexDirection: 'column-reverse',
        height: 130,
        justifyContent: 'center',
        padding: 10,
        width: width * 0.3,
    },
    label: {
        marginVertical: 8,
        textAlign: 'center',
        ...theme.typography.BodyMedium,
        flex: 1,
        fontSize: 14,
    },
});

export default Stats;

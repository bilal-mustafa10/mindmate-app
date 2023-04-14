import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { theme, width } from '../constants/Theme';

interface StatsProps {
    value: number;
    label: string;
    size: 'small' | 'medium' | 'large';
}

const getSizeDimensions = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
        case 'small':
            return { cardWidth: width * 0.3, cardHeight: 120, progressRadius: 30, strokeWidth: 5, fontSize: 13 };
        case 'medium':
            return { cardWidth: width * 0.45, cardHeight: 150, progressRadius: 40, strokeWidth: 10, fontSize: 15 };
        case 'large':
            return { cardWidth: width * 0.6, cardHeight: 160, progressRadius: 45, strokeWidth: 15, fontSize: 17 };
        default:
            return { cardWidth: width * 0.45, cardHeight: 150, progressRadius: 40, strokeWidth: 8, fontSize: 15 };
    }
};

const Stats = ({ value, label, size }: StatsProps) => {
    const { cardWidth, cardHeight, progressRadius, strokeWidth, fontSize } = getSizeDimensions(size);

    return (
        <View style={[styles.box, { width: cardWidth, height: cardHeight }]}>
            <CircularProgress
                value={value}
                duration={2000}
                inActiveStrokeOpacity={0.5}
                activeStrokeWidth={strokeWidth}
                inActiveStrokeWidth={strokeWidth}
                activeStrokeColor={'#3960A8'}
                inActiveStrokeColor={'#C2D0EA'}
                maxValue={100}
                radius={progressRadius}
            />
            <Text style={[styles.label, { fontSize }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 15,
        borderWidth: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        marginVertical: 8,
        textAlign: 'center',
        ...theme.typography.BodyMedium,
        flex: 1,
    },
});

export default Stats;

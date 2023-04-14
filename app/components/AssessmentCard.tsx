import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/Theme';
import CircularProgress from 'react-native-circular-progress-indicator';

export interface IAssessmentCardProps {
    id: string;
    date: string;
    time: string;
    result: string;
    score: number;
    type?: string;
}

const AssessmentCard: React.FC<IAssessmentCardProps> = ({ result, date, score, time }) => {
    let progressColor = '';

    if (score >= 0 && score <= 55) {
        progressColor = '#1C9C68';
    } else if (score >= 56 && score <= 59.9) {
        progressColor = '#F2C94C';
    } else if (score >= 60 && score <= 69.9) {
        progressColor = '#F2994A';
    } else if (score >= 70 && score <= 100) {
        progressColor = '#EB5757';
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.dateText, { color: progressColor }]}>{date}</Text>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <View style={styles.circularProgressContainer}>
                    <CircularProgress
                        value={score}
                        duration={2000}
                        inActiveStrokeOpacity={0.5}
                        activeStrokeWidth={8}
                        inActiveStrokeWidth={8}
                        activeStrokeColor={progressColor}
                        inActiveStrokeColor={theme.colors.tertiary}
                        maxValue={100}
                        radius={40}
                    />
                </View>
            </View>
            <View style={styles.resultContainer}>
                <Text style={[styles.resultText, { color: progressColor }]}>{result}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    circularProgressContainer: {
        alignItems: 'center',
    },
    container: {
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 15,
        elevation: 4,
        marginBottom: 12,
        padding: 12,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        width: '100%',
    },
    dateText: {
        ...theme.typography.BodyBold,
        color: theme.colors.primary,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    resultContainer: {
        borderColor: theme.colors.borderColor,
        borderTopWidth: 1,
        paddingTop: 12,
    },
    resultText: {
        ...theme.typography.BodyBold,
        textAlign: 'left',
    },
    timeText: {
        ...theme.typography.Text,
        color: theme.colors.textSecondary,
    },
});

export default AssessmentCard;

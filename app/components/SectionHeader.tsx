import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';
import { Button } from './Button';
import { theme } from '../constants/Theme';

interface SectionHeaderProps {
    title: string;
    buttonText?: string;
    onButtonPress?: () => void;
    backgroundColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, buttonText, onButtonPress, backgroundColor }) => {
    return (
        <View style={styles.sectionHeaderContainer}>
            <View style={{ backgroundColor: theme.colors.transparentBackground, borderRadius: 10, padding: 5 }}>
                <Text style={[theme.typography.SubHeading, styles.marginLeft, { color: backgroundColor }]}>
                    {title}
                </Text>
            </View>

            {buttonText ? (
                <Button onPress={onButtonPress} color={'primary'} type={'pill'}>
                    {buttonText}
                </Button>
            ) : (
                <View style={styles.emptyButtonSpace} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    emptyButtonSpace: {
        backgroundColor: theme.colors.transparentBackground,
        height: 25,
        marginVertical: 8,
        paddingHorizontal: 12,
        width: '25%',
    },
    marginLeft: {
        marginLeft: '2%',
    },
    sectionHeaderContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.transparentBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: '2.5%',
    },
});

export default SectionHeader;

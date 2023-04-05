import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './Themed';
import { Button } from './Button';
import { theme } from '../constants/Theme';

interface SectionHeaderProps {
    title: string;
    buttonText?: string;
    onButtonPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, buttonText, onButtonPress }) => {
    return (
        <View style={styles.sectionHeaderContainer}>
            <Text style={[theme.typography.bodyBold, styles.titleText]}>{title}</Text>
            {buttonText ? (
                <Button onPress={onButtonPress} color={'secondary'} type={'pill'}>
                    {buttonText}
                </Button>
            ) : (
                <View style={styles.emptyButtonSpace} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginVertical: '2.5%',
    },
    titleText: {
        marginLeft: '3%',
    },
    emptyButtonSpace: {
        width: '25%',
        height: 25,
        paddingHorizontal: 12,
        marginVertical: 8,
        backgroundColor: 'transparent',
    },
});

export default SectionHeader;

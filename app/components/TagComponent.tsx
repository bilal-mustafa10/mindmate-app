import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/Theme';

interface TagProps {
    tags: string;
}

const TagComponent = ({ tags }: TagProps) => {
    const tagColors = {
        '1': '#D7F9E1',
        '2': '#D8D7F9',
        '3': '#F9E9D7',
    };

    return (
        <View style={styles.tagContainer}>
            {tags.split(',').map((tag, index) => (
                <View key={index} style={[styles.tagBox, { backgroundColor: tagColors[index + 1] || '#D7F9DA' }]}>
                    <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tagBox: {
        borderRadius: 10,
        marginHorizontal: 3,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagText: {
        ...theme.typography.Caption,
    },
});

export default TagComponent;

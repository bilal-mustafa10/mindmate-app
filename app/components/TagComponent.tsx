import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TagProps {
    tags: string,
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
                <View
                    key={index}
                    style={[
                        styles.tagBox,
                        { backgroundColor: tagColors[index + 1] || '#D7F9DA' },
                    ]}
                >
                    <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagBox: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 3,
    },
    tagText: {
        color: '#000',
        fontFamily: 'outfit-regular',
        fontSize: 12,
    },
});

export default TagComponent;

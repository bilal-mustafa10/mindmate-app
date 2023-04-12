// Import necessary libraries and components
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

const predefinedTags = ['Study', 'Social', 'Health', 'Relationship', 'Career', 'Hobbies', 'Finance', 'Emotional'];
// Define the state and event handlers
const AddReflectionScreen = () => {
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [content, setContent] = useState('');
    const [recording, setRecording] = useState<Audio.Recording | null>(null);

    const requestAudioPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        return status === 'granted';
    };

    const onStartRecording = async () => {
        const hasPermission = await requestAudioPermission();

        if (!hasPermission) {
            alert('Missing audio recording permission.');
            return;
        }

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                playThroughEarpieceAndroid: true,
            });

            const { recording } = await Audio.Recording.startAsync();
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording:', err);
        }
    };

    const onStopRecording = async () => {
        try {
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI();
            // Save the recording URI to your desired storage
        } catch (err) {
            console.error('Failed to stop recording:', err);
        }
        setRecording(null);
    };

    const onSaveReflection = () => {
        // Save the reflection data (title, tags, and audio recording) to your desired storage
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prevSelectedTags) => {
            if (prevSelectedTags.includes(tag)) {
                return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
            } else {
                return [...prevSelectedTags, tag];
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Add Reflection</Text>

            <TextInput style={styles.input} placeholder="Title" onChangeText={(text) => setTitle(text)} value={title} />

            <View style={styles.tagContainer}>
                {predefinedTags.map((tag) => (
                    <TouchableOpacity
                        key={tag}
                        style={[styles.tag, selectedTags.includes(tag) && styles.tagSelected]}
                        onPress={() => toggleTag(tag)}
                    >
                        <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TextInput
                style={[styles.input, styles.content]}
                placeholder="Content (Optional)"
                onChangeText={(text) => setContent(text)}
                value={content}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={recording ? onStopRecording : onStartRecording}>
                <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onSaveReflection}>
                <Text style={styles.buttonText}>Save Reflection</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Style the screen components
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3a82f6',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    content: {
        height: 100,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        height: 40,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    tag: {
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        marginBottom: 10,
        marginRight: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    tagSelected: {
        backgroundColor: '#3a82f6',
    },
    tagText: {
        color: '#333',
        fontWeight: 'bold',
    },
});

export default AddReflectionScreen;

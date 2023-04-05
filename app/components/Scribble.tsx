import React, {useState, useRef} from 'react';
import {PanResponder, View, StyleSheet, TouchableOpacity, Text, TextInput} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {height, width} from '../constants/Theme';
import {Button} from './Button';


interface ScribbleProps {
    onQuoteChange?: (quote: string) => void;
}


const Scribble = ({ onQuoteChange }: ScribbleProps) => {
    const insets = useSafeAreaInsets();
    const [paths, setPaths] = useState<{ path: string; color: string }[]>([]);
    const [currentPath, setCurrentPath] = useState('');
    const [currentColor, setCurrentColor] = useState('black');
    const [history, setHistory] = useState<string[]>([]);
    const [typing, setTyping] = useState(false);
    const [quote, setQuote] = useState('');
    const quoteInputRef = useRef<any>(null);


    const handleQuoteChange = (newQuote: string) => {
        setQuote(newQuote);
        if (onQuoteChange) {
            onQuoteChange(newQuote);
        }
    };


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => !typing,
        onMoveShouldSetPanResponder: () => !typing,
        onPanResponderGrant: (event) => {
            const x = event.nativeEvent.locationX;
            const y = event.nativeEvent.locationY;
            setCurrentPath(`M ${x} ${y}`);
            setHistory([]);
        },
        onPanResponderMove: (event) => {
            const x = event.nativeEvent.locationX;
            const y = event.nativeEvent.locationY;
            setCurrentPath((path) => `${path} L ${x} ${y}`);
        },
        onPanResponderRelease: () => {
            setPaths((prevPaths) => [...prevPaths, {path: currentPath, color: currentColor}]);
            setCurrentPath('');
        },
    });

    const undo = () => {
        if (paths.length === 0) return;
        setHistory((prevHistory) => [...prevHistory, paths[paths.length - 1].path]);
        setPaths((prevPaths) => prevPaths.slice(0, -1));
    };

    const redo = () => {
        if (history.length === 0) return;
        setPaths((prevPaths) => [...prevPaths, {path: history[history.length - 1], color: currentColor}]);
        setHistory((prevHistory) => prevHistory.slice(0, -1));
    };

    const activateEraser = () => {
        setCurrentColor('white');
    };

    const changeColor = (color: string) => {
        setCurrentColor(color);
    };

    const toggleTyping = () => {
        setTyping((prevTyping) => !prevTyping);
    };

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <View style={styles.toolbarRow}>
                    <Button type={'pill'} onPress={undo} color={'error'}>Undo</Button>
                    <Button type={'pill'} onPress={redo} color={'secondary'}>Redo</Button>
                    <Button type={'pill'} onPress={() => changeColor('blue')} color={'tertiary'}>Blue</Button>
                    <Button type={'pill'} onPress={() => changeColor('black')} color={'tertiary'}>Black</Button>
                </View>
            </View>
            <View style={styles.canvasWrapper} {...panResponder.panHandlers}>
                <Svg width={width} height={height * 0.4}>
                    {paths.map(({ path, color }, index) => (
                        <Path key={index} d={path} stroke={color} strokeWidth={2} />
                    ))}
                    {currentPath && (
                        <Path d={currentPath} stroke={currentColor} strokeWidth={2} />
                    )}
                </Svg>
                {typing && (
                    <TextInput
                        ref={quoteInputRef}
                        style={styles.quoteInput}
                        multiline
                        onChangeText={handleQuoteChange}
                        value={quote}
                        autoFocus
                    />
                )}
            </View>
            <View style={styles.toolbar}>
                <View style={styles.toolbarRow}>
                    <Button type={'small'} onPress={activateEraser} color={'tertiary'}>Eraser</Button>
                    <Button type={'small'} onPress={toggleTyping} color={'primary'}>{typing ? 'Stop Typing' : 'Type Quote'}</Button>
                </View>
                <View style={styles.toolbarRow}>
                    <Button type={'small'} onPress={() => onQuoteChange && onQuoteChange(quote)} color={'secondary'}>Save</Button>
                    <Button type={'small'} onPress={() => onQuoteChange && onQuoteChange('')} color={'error'}>Cancel</Button>
                </View>
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingVertical: '5%',
        flex: 1,
    },
    canvasWrapper: {
        height: height * 0.5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
    },
    toolbar: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 0,
        backgroundColor: 'white',
    },
    toolbarRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    toolButton: {
        padding: 5,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    toolButtonText: {
        fontSize: 16,
    },
    quoteInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        fontSize: 16,
    },
});

export default Scribble;

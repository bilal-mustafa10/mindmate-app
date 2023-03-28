import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {theme} from '../constants/Theme';
import {RectButton} from 'react-native-gesture-handler';
import {Button} from './Button';
import {moodImages} from '../constants/Images';

const sampleMoodData = [
    { date: '2023-03-02', mood: 'Happy', note: 'I had a great day today!' },
    { date: '2023-03-02', mood: 'Unsure', note: 'I had an ok day today!' },
    { date: '2023-03-28', mood: 'Happy', note: 'I had a great day today!' },
];



const getWeekDates = (numDays = 45) => {
    const weekDates = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    for (let i = 0; i < numDays - 1; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        weekDates.unshift(date);
    }

    return weekDates;
};


const getMonthName = (date) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

const getMoodDataForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return sampleMoodData.filter((item) => item.date === dateString);
};


export function CalendarComponent() {
    const [dates] = useState(getWeekDates().reverse());
    const [month, setMonth] = useState(getMonthName(dates[0]));

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(currentDate); // Set selectedDate to currentDate initially

    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const itemWidth = 60;
        const index = Math.round(scrollX / itemWidth);
        setMonth(getMonthName(dates[index]));
    };

    const handleDateSelect = (date) => setSelectedDate(date);

    const selectedDateMoodData = selectedDate ? getMoodDataForDate(selectedDate) : [];


    const renderItem = ({item: date, index}) => {
        const isSelectedDate = selectedDate && date.getTime() === selectedDate.getTime();
        const dateTextStyle = isSelectedDate
            ? { ...theme.typography.bodyBold, color: 'blue' }
            : { ...theme.typography.bodyBold };
        const dayTextStyle = isSelectedDate
            ? { ...theme.typography.bodyBold, color: 'blue' }
            : { ...theme.typography.body };

        return (
            <RectButton style={styles.dateButton} key={index} onPress={() => handleDateSelect(date)}>
                <View style={styles.dateGroup}>
                    <Text style={dateTextStyle}>{date.getDate()}</Text>
                    <Text style={dayTextStyle}>
                        {new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}
                    </Text>
                </View>
            </RectButton>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={theme.typography.subTitle}>{month}</Text>
                <Button onPress={() => console.log('press')} color={'secondary'} type={'pill'}>add</Button>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dates}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                inverted={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />
            {selectedDate && (
                <View style={styles.selectedDateMoodData}>
                    {selectedDateMoodData.length === 0 ? (
                        <Text style={styles.noDataText}>No mood data for the selected date.</Text>
                    ) : (
                        selectedDateMoodData.map((moodData, moodIndex) => (
                            <View style={styles.moodDataContainer} key={`mood-${moodIndex}`}>
                                <View style={{padding: 10,flexDirection: 'row'}}>
                                    <Image
                                        style={[styles.moodImage, {marginRight: 10}]}
                                        source={moodImages.find((moodImage) => moodImage.name === moodData.mood).image}
                                    />
                                    <View>
                                        <Text style={styles.moodText}>{moodData.mood}</Text>
                                        <Text style={styles.dateText}>{selectedDate.toLocaleDateString()}</Text>
                                    </View>
                                </View>

                                <View style={{ paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', backgroundColor:'transparent' }}>
                                    <Text style={styles.noteText}>{moodData.note}</Text>
                                    <Button onPress={() => console.log('press')} color={'secondary'} type={'pill'}>share</Button>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            )}

        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginVertical: '2%',
    },
    dateButton: {
        paddingHorizontal: 4,
    },
    dateGroup: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        minWidth: 60,
        borderWidth: 1,
        borderColor: '#D9D9D9',
    },
    moodDataContainer: {
        marginTop: 10,
        width: '100%',
        height: 100,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 4,
    },
    moodText: {
        ...theme.typography.body,
    },
    noteText: {
        ...theme.typography.journalText,
    },
    selectedDateMoodData: {
        marginTop: 20,
    },
    selectedDateText: {
        ...theme.typography.bodyBold,
        marginBottom: 10,
    },
    noDataText: {
        ...theme.typography.body,
        fontStyle: 'italic',
    },
    moodImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    container: {
        paddingHorizontal: 8,
    },
    /*    moodDataContainer: {
        padding: 10,
        flexDirection: 'row',
        marginTop: 4,
        width: '100%',
        height: 80,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
    },*/
    textAndButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%',
        width: '80%',
        marginLeft: 8,
    },
    dateText: {
        fontSize: 10,
        fontWeight: '300',
    },
    buttonText: {
        fontSize: 8,
        fontWeight: '200',
        textAlign: 'right',
    },
    forwardButton: {
        width: 20,
        height: '100%',
    },
});


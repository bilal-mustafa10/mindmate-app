import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {theme} from '../constants/Theme';
import {RectButton} from 'react-native-gesture-handler';
import {Button} from './Button';
import {MoodCard} from './MoodCard';


interface IMoodDataProps {
    date: string;
    mood: string;
    note: string;
}

const findEarliestDate = (moodData) => {
    const earliestDate = moodData.reduce((earliest, current) => {
        return earliest.date < current.date ? earliest : current;
    });

    return earliestDate.date;
};

const getCalendarDates = (earliestDate) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const earliestDateObj = new Date(earliestDate) ;

    const datesInRange = [];

    while (earliestDateObj <= currentDate) {
        const dateStr = earliestDateObj.toISOString().split('T')[0];
        datesInRange.push(dateStr);

        earliestDateObj.setDate(earliestDateObj.getDate() + 1);
    }

    return datesInRange;
};

const getMonthName = (date) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[date.getMonth()];
};


export function CalendarComponent({moodData}: {moodData: IMoodDataProps[]}) {
    const currentDate = new Date();
    const currentMonth = getMonthName(currentDate);
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
    const earliestDate = findEarliestDate(moodData);
    const [dates] = useState(getCalendarDates(earliestDate).reverse());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [displayedMonth, setDisplayedMonth] = useState(currentMonth);
    const [scrollPosition, setScrollPosition] = useState(0);

    const getMoodDataForDate = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return moodData.filter((item) => item.date.split('T')[0] === dateString);
    };

    const selectedDateMoodData = selectedDate ? getMoodDataForDate(selectedDate) : [];

    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const dateContainerWidth = 60; // From styles.dateGroup
        const paddingHorizontal = 4; // From styles.dateButton
        const indexOffset = (dateContainerWidth + paddingHorizontal * 2) / 2;
        const index = Math.floor((scrollX + indexOffset) / (dateContainerWidth + paddingHorizontal * 2));
        const dateStr = dates[index];
        const newDisplayedMonth = getMonthName(new Date(dateStr));

        if (newDisplayedMonth !== displayedMonth) {
            setDisplayedMonth(newDisplayedMonth);
        }

        setScrollPosition(scrollX);
    };


    const renderItem = ({ item: date, index }) => {
        const dateObj = new Date(date);
        const dayOfWeek = weekdays[dateObj.getDay()];

        const isSelectedDate = selectedDate && dateObj.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];

        const dateGroupStyle = isSelectedDate
            ? { ...styles.dateGroup, backgroundColor: theme.colors.tertiary}
            : { ...styles.dateGroup };

        const dateTextStyle = isSelectedDate
            ? { ...theme.typography.bodyBold, color: 'white'}
            : { ...theme.typography.bodyBold };
        const dayTextStyle = isSelectedDate
            ? { ...theme.typography.bodyBold, color: 'white'}
            : { ...theme.typography.body };

        return (
            <RectButton style={styles.dateButton} key={index} onPress={() => setSelectedDate(dateObj)} underlayColor={'white'}>
                <View style={dateGroupStyle}>
                    <Text style={dateTextStyle}>{date.split('-')[2]}</Text>
                    <Text style={dayTextStyle}>{dayOfWeek}</Text>
                </View>
            </RectButton>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={theme.typography.subTitle}>{displayedMonth}</Text>
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
                            <MoodCard key={`mood-${moodIndex}`} moodData={moodData} selectedDate={selectedDate} />
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
    dateText: {
        fontSize: 10,
        fontFamily:'outfit-light'
    },
    selectedDateMoodData: {
        marginTop: 20,
    },
    noDataText: {
        ...theme.typography.body,
        fontStyle: 'italic',
    },
    container: {
        paddingHorizontal: 8,
    }
});


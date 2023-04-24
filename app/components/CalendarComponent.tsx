import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/Theme';
import { RectButton } from 'react-native-gesture-handler';
import { ReflectionCard } from './ReflectionCard';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import SectionHeader from './SectionHeader';
import MoodCard from './MoodCard';
import { AcknowledgmentToast } from './AcknowledgmentToast';

export interface IMoodDataProps {
    id?: string;
    mood: string;
    date: string;
    note: string;
    is_shared: boolean;
    likes?: number[];
    hub_id?: number;
    type: 'hub' | 'journal';
}

export interface IReflectionDataProps {
    id?: string;
    date: string;
    title: string;
    note: string;
    is_shared: boolean;
    likes?: number[];
    hub_id?: number;
    type: 'hub' | 'journal';
}

type DataProps = IMoodDataProps | IReflectionDataProps;

const findEarliestDate = (data) => {
    if (data.length === 0) {
        return new Date().toISOString().split('T')[0];
    }

    const earliestDate = data.reduce((earliest, current) => {
        return earliest.date < current.date ? earliest : current;
    });

    return earliestDate.date;
};

const getCalendarDates = (earliestDate) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const earliestDateObj = new Date(earliestDate);

    // Calculate the difference in days
    const diffInDays = Math.ceil((currentDate.getTime() - earliestDateObj.getTime()) / (1000 * 60 * 60 * 24));

    // If the difference is less than 7 days, update the earliestDateObj
    if (diffInDays < 5) {
        earliestDateObj.setDate(earliestDateObj.getDate() - (5 - diffInDays));
    }

    const datesInRange = [];

    while (earliestDateObj <= currentDate) {
        const dateStr = earliestDateObj.toISOString().split('T')[0];
        datesInRange.push(dateStr);

        earliestDateObj.setDate(earliestDateObj.getDate() + 1);
    }

    return datesInRange;
};

const getMonthName = (date) => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return monthNames[date.getMonth()];
};

export function CalendarComponent<T extends DataProps>({
    type,
    data,
    navigation,
}: {
    type: 'mood' | 'reflection';
    data: T[];
    navigation: NavigationProp<RootStackParamList>;
}) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1);
    const currentMonth = getMonthName(currentDate);
    const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
    const earliestDate = findEarliestDate(data);
    const [dates] = useState(getCalendarDates(earliestDate).reverse());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [displayedMonth, setDisplayedMonth] = useState(currentMonth);
    const [toastVisible, setToastVisible] = React.useState(false);

    const onShare = () => {
        setToastVisible(true);
    };

    const handleAddNavigation = () => {
        if (type === 'mood') {
            navigation.navigate('MoodScreen');
        } else {
            navigation.navigate('AddReflectionScreen');
        }
    };

    const getDataForDate = (date) => {
        const dateString = date.toISOString().split('T')[0];
        return data.filter((item) => item.date.split('T')[0] === dateString);
    };

    const selectedDateData = selectedDate ? getDataForDate(selectedDate) : [];

    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const dateContainerWidth = 60;
        const paddingHorizontal = 4;
        const indexOffset = (dateContainerWidth + paddingHorizontal * 2) / 2;
        const index = Math.floor((scrollX + indexOffset) / (dateContainerWidth + paddingHorizontal * 2));
        const dateStr = dates[index];
        const newDisplayedMonth = getMonthName(new Date(dateStr));

        if (newDisplayedMonth !== displayedMonth) {
            setDisplayedMonth(newDisplayedMonth);
        }
    };

    const renderItem = ({ item: date, index }) => {
        const dateObj = new Date(date);
        const dayOfWeek = weekdays[dateObj.getDay()];

        const isSelectedDate =
            selectedDate && dateObj.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];

        const dateGroupStyle = isSelectedDate
            ? { ...styles.dateGroup, backgroundColor: theme.colors.tertiary }
            : { ...styles.dateGroup };

        const dateTextStyle = isSelectedDate
            ? { ...theme.typography.bodyBold, color: 'white' }
            : { ...theme.typography.bodyBold };
        const dayTextStyle = isSelectedDate
            ? { ...theme.typography.bodyBold, color: 'white' }
            : { ...theme.typography.body };

        return (
            <RectButton
                style={styles.dateButton}
                key={index}
                onPress={() => setSelectedDate(dateObj)}
                underlayColor={'white'}
            >
                <View style={dateGroupStyle}>
                    <Text style={dateTextStyle}>{date.split('-')[2]}</Text>
                    <Text style={dayTextStyle}>{dayOfWeek}</Text>
                </View>
            </RectButton>
        );
    };

    return (
        <>
            <View style={styles.container}>
                {toastVisible ? (
                    <AcknowledgmentToast
                        message="Shared successfully!"
                        visible={toastVisible}
                        onDismiss={() => setToastVisible(false)}
                        bgColor={theme.colors.secondary}
                    />
                ) : (
                    <SectionHeader
                        title={displayedMonth}
                        buttonText={`add ${type}`}
                        onButtonPress={handleAddNavigation}
                    />
                )}

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
                        {selectedDateData.length === 0 ? (
                            <Text style={styles.noDataText}>No data for the selected date.</Text>
                        ) : (
                            selectedDateData.map((data) =>
                                type === 'mood' ? (
                                    <MoodCard key={data.id} moodData={data as IMoodDataProps} onShare={onShare} />
                                ) : (
                                    <ReflectionCard key={data.id} reflectionData={data as IReflectionDataProps} />
                                )
                            )
                        )}
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    dateButton: {
        paddingHorizontal: 4,
    },
    dateGroup: {
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderColor: theme.colors.borderColor,
        borderRadius: 10,
        borderWidth: 1,
        minWidth: 60,
        paddingVertical: 10,
    },
    noDataText: {
        ...theme.typography.bodyBold,
        color: theme.colors.disabled,
        textAlign: 'center',
    },
    selectedDateMoodData: {
        marginTop: 20,
    },
});

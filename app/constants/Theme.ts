import { Dimensions, StyleSheet } from 'react-native';

export const theme = {
    colors: {
        primary: '#5539A8',
        secondary: '#1F9429',
        tertiary: '#2B61C4',
        error: '#A83944',
        background: '#F9F9F9',
        secondaryBackground: '#F5F4FF',
        text: '#333333',
        textSecondary: '#666666',
        disabled: '#C0C0C0',
        borderColor: '#E5E5E5',
    },
    typography: {
        body: {
            fontFamily: 'nunito-regular',
            fontSize: 16,
        },
        bodyMedium: {
            fontFamily: 'nunito-medium',
            fontSize: 16,
        },
        bodySemiBold: {
            fontFamily: 'nunito-semibold',
            fontSize: 16,
        },
        bodyBold: {
            fontFamily: 'nunito-bold',
            fontSize: 16,
        },
        heading: {
            fontFamily: 'nunito-semibold',
            fontSize: 24,
        },
        headingBold: {
            fontFamily: 'nunito-bold',
            fontSize: 24,
        },
        subtitle: {
            fontFamily: 'nunito-regular',
            fontSize: 18,
        },
        subtitleMedium: {
            fontFamily: 'nunito-medium',
            fontSize: 18,
        },
        caption: {
            fontFamily: 'nunito-regular',
            fontSize: 12,
        },
        captionMedium: {
            fontFamily: 'nunito-medium',
            fontSize: 12,
        },
        captionSemiBold: {
            fontFamily: 'nunito-semibold',
            fontSize: 12,
        },
    },
    five_ways_theme: {
        'Keep Active': '#2B61C4',
        'Connect with others': '#A83973',
        'Keep Learning': '#A85B39',
        'Give to others': '#6F39A8',
        'Take Notice': '#1F9429',
    },
    card_theme: {
        0: '#2B61C4',
        1: '#5539A8',
        2: '#1F9429',
        3: '#A83944',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
};

export const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: '5%',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    formContainer: {
        paddingVertical: '5%',
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    rowScrollContainer: {
        flexDirection: 'row',
        overflow: 'scroll',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    secondaryBackground: {
        backgroundColor: theme.colors.secondaryBackground,
    },
    primaryBackground: {
        backgroundColor: theme.colors.background,
    },
    logo: {
        marginTop: 40,
        width: width * 0.8,
        height: width * 0.8,
    },
    activityLogo: {
        width: width * 0.35,
        height: width * 0.35,
        marginBottom: 20,
    },
    logoWithoutContainer: {
        width: width * 0.5,
        height: width * 0.5 * 0.5,
    },
    leadPhoto: {
        width: width,
        height: undefined,
        aspectRatio: 1,
    },
    activityContainer: {
        height: 60,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'absolute',
        bottom: 35,
        width: '90%',
        alignSelf: 'center',
    },
    iconButton: {
        marginRight: 8,
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inspirationBox: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10,
    },
    fullScreenContainer: {
        paddingTop: 50,
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        marginTop: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
    },
});

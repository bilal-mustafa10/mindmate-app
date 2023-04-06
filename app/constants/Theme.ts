import { Dimensions, StyleSheet } from 'react-native';

export const theme = {
    colors: {
        primary: '#5539A8',
        secondary: '#1F9429',
        tertiary: '#2B61C4',
        error: '#A83944',
        background: '#F9F9F9',
        secondaryBackground: '#F5F4FF',
        whiteBackground: '#FFFFFF',
        text: '#333333',
        textSecondary: '#666666',
        disabled: '#C0C0C0',
        borderColor: '#E5E5E5',
        shadowColor: '#000',
        transparentBackground: 'transparent',
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
        error: {
            fontFamily: 'nunito-bold',
            fontSize: 16,
            color: '#A83944',
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
        xxs: 4,
        xs: 8,
        sm: 12,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
};

export const { width, height } = Dimensions.get('window');
const cardWidth = (width - 43) / 3;

export const styles = StyleSheet.create({
    activityContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 12,
        bottom: 35,
        elevation: 5,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        position: 'absolute',
        shadowColor: theme.colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '90%',
    },
    activityLogo: {
        height: width * 0.35,
        marginBottom: 20,
        width: width * 0.35,
    },
    allResourcesCardContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.transparentBackground,
        marginVertical: 10,
        width: cardWidth,
    },
    allResourcesContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.transparentBackground,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    backButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        paddingHorizontal: '5%',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    formContainer: {
        paddingVertical: '5%',
    },
    fullScreenContainer: {
        flex: 1,
        paddingTop: 50,
    },
    iconButton: {
        marginRight: 8,
    },
    landingBottomContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: '10%',
    },
    landingContainer: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    logo: {
        height: width * 0.8,
        marginTop: 40,
        width: width * 0.8,
    },
    logoWithoutContainer: {
        height: width * 0.5 * 0.5,
        width: width * 0.5,
    },
    marginBottom: {
        marginBottom: '5%',
    },
    marginTop: {
        marginTop: '5%',
    },
    mindStatsContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.transparentBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryBackground: {
        backgroundColor: theme.colors.background,
    },
    rowScrollContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        overflow: 'scroll',
    },
    secondaryBackground: {
        backgroundColor: theme.colors.secondaryBackground,
    },
    transparentBackground: {
        backgroundColor: theme.colors.transparentBackground,
    },
});

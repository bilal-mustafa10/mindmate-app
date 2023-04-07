import { Dimensions, StyleSheet, ViewStyle } from 'react-native';

const createTypographyStyles = (fontFamily: string, fontSize: number) => ({
    fontFamily,
    fontSize,
});

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
        body: createTypographyStyles('nunito-regular', 16),
        bodyMedium: createTypographyStyles('nunito-medium', 16),
        bodySemiBold: createTypographyStyles('nunito-semibold', 16),
        bodyBold: createTypographyStyles('nunito-bold', 16),
        heading: createTypographyStyles('nunito-semibold', 24),
        headingBold: createTypographyStyles('nunito-bold', 24),
        subtitle: createTypographyStyles('nunito-regular', 18),
        subtitleMedium: createTypographyStyles('nunito-medium', 18),
        caption: createTypographyStyles('nunito-regular', 12),
        captionMedium: createTypographyStyles('nunito-medium', 12),
        captionSemiBold: createTypographyStyles('nunito-semibold', 12),
        error: {
            ...createTypographyStyles('nunito-bold', 16),
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
    },
};

export const { width, height } = Dimensions.get('window');
const cardWidth = (width - 43) / 3;

const baseContainer: ViewStyle = {
    alignItems: 'center',
    backgroundColor: theme.colors.transparentBackground,
};

export const styles = StyleSheet.create({
    activityButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    activityContainer: {
        ...baseContainer,
        alignSelf: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 20,
        bottom: 20,
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
    activityHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        marginTop: 15,
    },
    activityLogo: {
        height: width * 0.35,
        marginBottom: 20,
        width: width * 0.35,
    },
    allResourcesCardContainer: {
        ...baseContainer,
        marginVertical: 10,
        width: cardWidth,
    },
    allResourcesContainer: {
        ...baseContainer,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    backButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    backHeaderLeft: {
        alignItems: 'center',
        flexDirection: 'row',
        left: 10,
        position: 'absolute',
        zIndex: 2,
    },
    container: {
        paddingHorizontal: '5%',
    },
    content: {
        ...baseContainer,
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    favouriteLogo: {
        height: 30,
        width: 30,
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
        ...baseContainer,
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
        ...baseContainer,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryBackground: {
        backgroundColor: theme.colors.background,
    },
    rowScrollContainer: {
        ...baseContainer,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        overflow: 'scroll',
    },
    secondaryBackground: {
        backgroundColor: theme.colors.secondaryBackground,
    },
    switchContainer: {
        marginHorizontal: '2%',
    },
    transparentBackground: {
        backgroundColor: theme.colors.transparentBackground,
    },
    viewActivityContainer: {
        marginBottom: '30%',
        paddingHorizontal: '5%',
    },
});

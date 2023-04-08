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
        Heading: createTypographyStyles('outfit-bold', 32),
        SubHeading: createTypographyStyles('outfit-bold', 22),
        BodyBold: createTypographyStyles('outfit-bold', 18),
        BodyMedium: createTypographyStyles('outfit-medium', 18),
        Body: createTypographyStyles('outfit-regular', 18),
        Error: {
            ...createTypographyStyles('outfit-bold', 16),
            color: '#A83944',
        },
        Text: createTypographyStyles('outfit-regular', 16),
        CardText: createTypographyStyles('outfit-medium', 12),
        Caption: createTypographyStyles('outfit-regular', 12),
        body: createTypographyStyles('nunito-regular', 18),
        bodyMedium: createTypographyStyles('nunito-medium', 18),
        bodySemiBold: createTypographyStyles('nunito-semibold', 18),
        bodyBold: createTypographyStyles('nunito-bold', 18),
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
        alignItems: 'center',
        backgroundColor: theme.colors.whiteBackground,
        borderTopColor: theme.colors.borderColor,
        borderTopWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    activityHeader: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        marginTop: 20,
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
        justifyContent: 'space-evenly',
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
        marginHorizontal: '3%',
    },
    landingBottomContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: '5%',
    },
    landingContainer: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
    landingLogoContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.secondaryBackground,
        height: height * 0.6,
        justifyContent: 'center',
    },
    logo: {
        alignSelf: 'center',
        height: width * 0.8,
        justifyContent: 'center',
        width: width * 0.8,
    },
    logoWithoutContainer: {
        height: width * 0.5 * 0.5,
        width: width * 0.5,
    },
    mainContainer: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingHorizontal: '5%',
    },
    marginBottomLarge: {
        marginBottom: '10%',
    },
    marginBottomMedium: {
        marginBottom: '5%',
    },
    marginBottomSmall: {
        marginBottom: '2%',
    },
    marginTopLarge: {
        marginTop: '10%',
    },
    marginTopMedium: {
        marginTop: '5%',
    },
    marginTopSmall: {
        marginTop: '2%',
    },
    mindStatsContainer: {
        ...baseContainer,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paddingBottomLarge: {
        paddingBottom: '30%',
    },
    paddingTop: {
        paddingTop: '20',
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
        marginHorizontal: '5%',
    },
    tagContainer: {
        backgroundColor: theme.colors.whiteBackground,
        borderRadius: 15,
        elevation: 5,
        marginVertical: 5,
        paddingBottom: 15,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    transparentBackground: {
        backgroundColor: theme.colors.transparentBackground,
    },
    viewActivityContainer: {
        backgroundColor: '#F5F5F5',
        marginBottom: '30%',
        // paddingHorizontal: '5%',
        padding: 16,
    },
});

import { Dimensions, StyleSheet, ViewStyle } from 'react-native';

const createTypographyStyles = (fontFamily: string, fontSize: number) => ({
    fontFamily,
    fontSize,
});

export const theme = {
    colors: {
        primary: '#7C47C2',
        secondary: '#47C26E',
        tertiary: '#4766C2',
        error: '#C24747',
        background: '#FAFAFA',
        secondaryBackground: '#F5F4FF',
        whiteBackground: '#FFFFFF',
        text: '#333333',
        textSecondary: '#666666',
        textTertiary: '#A4A4A4',
        disabled: '#C0C0C0',
        borderColor: '#E5E5E5',
        shadowColor: '#000',
        transparent: 'transparent',
        transparentBackground: 'transparent',
    },
    typography: {
        Heading: createTypographyStyles('outfit-bold', 32),
        SubHeading: createTypographyStyles('outfit-bold', 22),
        BodyBold: createTypographyStyles('outfit-bold', 18),
        BodySemiBold: createTypographyStyles('outfit-semibold', 18),
        BodyMedium: createTypographyStyles('outfit-medium', 18),
        Body: createTypographyStyles('outfit-regular', 18),
        Error: {
            ...createTypographyStyles('outfit-bold', 20),
            color: '#A83944',
        },
        TextSemiBold: createTypographyStyles('outfit-semibold', 16),
        Text: createTypographyStyles('outfit-regular', 16),
        CardText: createTypographyStyles('outfit-medium', 13),
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
        'Keep Active': '#4766C2',
        'Connect with others': '#C2479B',
        'Keep Learning': '#C26E47',
        'Give to others': '#7C47C2',
        'Take Notice': '#47C26E',
    },
    card_theme: {
        0: '#47C26E',
        1: '#7C47C2',
        2: '#4766C2',
        3: '#C24747',
    },
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
};

// colors used in the icons : #F0DEFF
export const { width, height } = Dimensions.get('window');

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
    activityPadding: {
        paddingLeft: '4%',
    },
    allResourcesCardContainer: {
        backgroundColor: theme.colors.transparentBackground,
        marginVertical: 10,
    },
    allResourcesContainer: {
        ...baseContainer,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
    bottomSection: {
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    buttonBottomStyle: {
        alignSelf: 'center',
        backgroundColor: theme.colors.transparentBackground,
        bottom: 30,
        position: 'absolute',
        width: '90%',
    },
    container: {
        paddingHorizontal: '5%',
    },
    content: {
        ...baseContainer,
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    disclaimerContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.transparentBackground,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        padding: 10,
    },
    disclaimerText: {
        ...theme.typography.error,
        textAlign: 'center',
    },
    emptyShortcutContainer: {
        alignItems: 'center',
        backgroundColor: theme.colors.secondaryBackground,
        borderRadius: 15,
        flexDirection: 'row',
        height: 100,
        justifyContent: 'center',
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
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: '5%',
        width: '90%',
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
        //paddingHorizontal: '5%',
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
    noDataContainer: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    paddingBottomLarge: {
        paddingBottom: '30%',
    },
    paddingEndLarge: {
        paddingBottom: '100%',
    },
    paddingHorizontal: {
        paddingHorizontal: '3%',
    },
    paddingMedium: {
        padding: '10%',
    },
    paddingTop: {
        paddingTop: 20,
    },
    primaryBackground: {
        backgroundColor: theme.colors.background,
    },
    rowScrollContainer: {
        ...baseContainer,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        overflow: 'scroll',
        paddingVertical: 5,
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
    topSection: {
        alignSelf: 'center',
        height: height * 0.5,
        justifyContent: 'center',
        paddingBottom: 16,
        paddingHorizontal: 16,
        width: '100%',
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

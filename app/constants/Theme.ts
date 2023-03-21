import { Dimensions, StyleSheet } from 'react-native';

export const theme = {
    colors: {
        primary: '#5539A8',
        secondary: '#39A873',
        tertiary: '#3960A8',
        error: '#A83944',
        background: '#F5F5F5',
        secondaryBackground: '#F2E8FF',
        text: '#000000',
        textSecondary: '#FFFFFF',
    },
    typography: {
        header1: {
            fontFamily: 'outfit-bold',
            fontSize: 32,
            lineHeight: 40,
            letterSpacing: -0.5,
        },
        header2: {
            fontFamily: 'outfit-semibold',
            fontSize: 24,
            lineHeight: 32,
            letterSpacing: -0.2,
        },
        header3: {
            fontFamily: 'outfit-medium',
            fontSize: 18,
            lineHeight: 24,
            letterSpacing: 0,
        },
        body1: {
            fontFamily: 'outfit-regular',
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.2,
        },
        body2: {
            fontFamily: 'outfit-semibold',
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: 0.25,
        },
        caption: {
            fontFamily: 'outfit-regular',
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 0.4,
        },
        button: {
            fontFamily: 'outfit-semibold',
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: 0.75,
            color: '#FFFFFF'
        },
    },
};

export const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: '10%',
        backgroundColor: theme.colors.background,
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
    logoWithoutContainer: {
        width: width * 0.6,
        height: width * 0.6 * 0.5,
        marginBottom: 20,
    },
    title: {
        ...theme.typography.header1,
        marginBottom: 16,
    },
    subtitle: {
        ...theme.typography.header2,
        marginBottom: 12,
    },
    label: {
        ...theme.typography.header3,
        marginBottom: 8,
    },
    body: {
        ...theme.typography.body1,
        marginBottom: 8,
    },
});

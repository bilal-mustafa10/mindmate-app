import { Dimensions, StyleSheet } from 'react-native';
export const theme = {
    colors: {
        primary: '#5539A8',
        secondary: '#39A873',
        tertiary: '#3960A8',
        error: '#A83944',
        background: '#F9F9F9',
        secondaryBackground: '#F2E8FF',
        text: '#000000',
        textSecondary: '#FFFFFF',
    },
    typography: {
        h1: {
            fontFamily: 'outfit-bold',
            fontSize: 24,
            lineHeight: 41,
            letterSpacing: -0.41,
            color: '#000000',
        },
        h2: {
            fontFamily: 'outfit-semibold',
            fontSize: 20,
            lineHeight: 34,
            letterSpacing: -0.34,
            color: '#000000',
        },
        h3: {
            fontFamily: 'outfit-medium',
            fontSize: 16,
            lineHeight: 28,
            letterSpacing: -0.22,
            color: '#000000',
        },
        body: {
            fontFamily: 'outfit-regular',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.41,
            color: '#000000',
        },
        subheading: {
            fontFamily: 'outfit-semibold',
            fontSize: 15,
            lineHeight: 20,
            letterSpacing: -0.24,
            color: '#000000',
        },
        footnote: {
            fontFamily: 'outfit-regular',
            fontSize: 14,
            lineHeight: 18,
            letterSpacing: -0.08,
            color: '#000000',
        },
        caption: {
            fontFamily: 'outfit-regular',
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: -0.06,
            color: '#000000',
        },
        button: {
            fontFamily: 'outfit-semibold',
            fontSize: 16,
            lineHeight: 20,
            letterSpacing: -0.24,
            color: '#FFFFFF',
        }
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
        width: width * 0.6,
        height: width * 0.6 * 2 / 3,
        marginBottom: 16,
    },
    title: {
        ...theme.typography.h1,
        marginBottom: 16,
    },
    subtitle: {
        ...theme.typography.h2,
        marginBottom: 12,
    },
    label: {
        ...theme.typography.subheading,
        marginBottom: 8,
    },
    body: {
        ...theme.typography.body,
        marginBottom: 8,
    },


});

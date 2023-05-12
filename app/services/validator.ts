export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) {
        return 'Password cannot be empty.';
    }

    return '';
};

export const nameValidator = (name: string) => {
    const re = /^[a-zA-Z ]+$/;
    if (!name || name.length <= 0) {
        return 'First or Last Name cannot be empty.';
    }

    if (!re.test(name)) {
        return 'Please enter a valid name.';
    }

    return '';
};

export const usernameValidator = (username: string) => {
    const re = /\S+/;

    if (!username || username.length <= 0) {
        return 'Username cannot be empty.';
    }
    if (!re.test(username)) {
        return 'Pleas enter a valid username.';
    }

    return '';
};

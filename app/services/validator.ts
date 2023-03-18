export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) {
        return 'Password cannot be empty.';
    }

    return '';
};

export const nameValidator = (name: string) => {
    const re = /^[a-zA-Z ]+$/;
    if (!name || name.length <= 0) {
        return 'Name cannot be empty.';
    }

    if (!re.test(name)) {
        return 'Please enter a valid name.';
    }

    return '';
};

export const emailValidator = (email: string) => {
    const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!email || email.length <= 0) {
        return 'Email cannot be empty.';
    }

    if (!re.test(email)) {
        return 'Please enter a valid email address.';
    }

    return '';
};

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
    //const re = /\S+@\S+\.\S+/;
    const re = /\S+/;

    if (!username || username.length <= 0) {
        return 'Username cannot be empty.';
    }
    if (!re.test(username)) {
        return 'Pleas enter a valid username.';
    }

    return '';
};

export const emailValidator = (email: string) => {
    const re = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!email || email.length <= 0) {
        return 'Email cannot be empty.';
    }

    if (!re.test(email)) {
        return 'Please enter a valid email address.';
    }

    return '';
};

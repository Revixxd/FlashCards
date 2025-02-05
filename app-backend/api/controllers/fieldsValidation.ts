import validator from 'validator';

const isEmailValid = (email: string): boolean => {
    return validator.isEmail(email);
};

const isUsernameValid = (username: string): boolean => {
    if (!username) return true;
    username = username.trim();
    const regex = /^[A-Za-z0-9]{3,20}$/;
    return regex.test(username);
};

const passwordValidation = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
};
const arePasswordsSame = (password: string, repeatPassword: string): boolean => {
    return password === repeatPassword;
}

export { isEmailValid, isUsernameValid, passwordValidation, arePasswordsSame };
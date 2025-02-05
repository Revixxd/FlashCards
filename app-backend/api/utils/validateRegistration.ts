import express from 'express';
import { isEmailValid, isUsernameValid, passwordValidation, arePasswordsSame } from '../controllers/fieldsValidation.js';

const validateRegitraion = (user: any, res: express.Response): boolean => {
    if (!isUsernameValid(user.username)) {
        res.status(400).json({
            message: 'Username is not valid'
        });
        return false;
    }
    if (!isEmailValid(user.email)) {
        res.status(400).json({
            message: 'Email is not valid'
        });
        return false;
    }
    if (!passwordValidation(user.password)) {
        res.status(400).json({
            message: 'Password is not valid'
        });
        return false;
    }
    if (!arePasswordsSame(user.password, user.repeatPassword)) {
        res.status(400).json({
            message: 'Passwords do not match'
        });
        return false
    }
    return true;
}
export default validateRegitraion;
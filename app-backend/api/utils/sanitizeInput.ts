import validator from 'validator';

const sanitizeInput = (input: string | undefined): string => {
    if(typeof(input) === 'undefined' || input === null || input === '') {
        console.warn("input is null or undefined");
        return '';
    }
    return validator.escape(input);
}

export default sanitizeInput;
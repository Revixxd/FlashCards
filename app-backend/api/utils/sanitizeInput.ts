import validator from 'validator';

const sanitizeInput = (input: string): string => {
    return validator.escape(input);
}

export default sanitizeInput;
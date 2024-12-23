import validator from 'validator';

const sanitizeInput = (input: string | undefined): string => {
    if(typeof(input) === 'undefined' || input === null){
        console.error("input is null or undefined");
        return '';
    }
    return validator.escape(input);
}

export default sanitizeInput;
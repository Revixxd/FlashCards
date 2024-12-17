import validator from 'validator';

const sanitizeInput = (input: string): string => {
    if(input === null || input === undefined){
        console.error("input is null or undefined");
    }
    return validator.escape(input);
}

export default sanitizeInput;
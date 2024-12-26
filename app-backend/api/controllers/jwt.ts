import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const createJwtToken = (payload: object): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { JWT_PRIVATE_KEY } = process.env;
        if (!JWT_PRIVATE_KEY) {
            throw new Error("JWT_PRIVATE_KEY is not defined in environment variables");
        }
        jwt.sign({ payload }, JWT_PRIVATE_KEY, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token as string);
        });
    });
};

export const createRefreshToken = (payload: object): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { JWT_REFRESH_KEY } = process.env;
        if (!JWT_REFRESH_KEY) {
            throw new Error("JWT_REFRESH_KEY is not defined in environment variables");
        }
        jwt.sign({ payload }, JWT_REFRESH_KEY, { expiresIn: "7d" }, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token as string);
        });
    });
};

export const convertJwtToken = (token: string): Promise<object> => {
    return new Promise((resolve, reject) => {
        const { JWT_PRIVATE_KEY } = process.env;
        if (!JWT_PRIVATE_KEY) {
            throw new Error("JWT_PRIVATE_KEY is not defined in environment variables");
        }
        jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return reject(new Error("Token has expired"));
                }
                return reject(err);
            }
            resolve(decoded as object);
        });
    });
};
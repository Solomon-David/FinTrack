import jwt from "jsonwebtoken";
import { TokenPayload } from "../interfaces"


const ACCESS_SECRET = process.env.ACCESS_SECRET || "nothing";
const REFRESH_SECRET: string = process.env.REFRESH_SECRET || "nothing";

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, ACCESS_SECRET, {expiresIn: "15m"});
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: "7d"});
}

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
}
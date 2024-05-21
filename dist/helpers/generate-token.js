"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jwtHelpers_1 = require("./jwtHelpers");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const generateTokens = (user) => {
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    }, accessTokenSecret, "15m");
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    }, refreshTokenSecret, "30d");
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const prisma_1 = __importDefault(require("../../libs/prisma"));
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const generate_token_1 = require("../../helpers/generate-token");
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({ where: { id } });
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
}));
exports.default = passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID,
    clientSecret,
    callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!profile.emails || !profile.emails[0].value) {
            throw new Error("Google account does not have an email.");
        }
        const email = profile.emails[0].value;
        const existingUser = yield prisma_1.default.user.findFirst({
            where: {
                OR: [{ googleId: profile.id }, { email: email }],
            },
        });
        if (existingUser) {
            if (!existingUser.googleId) {
                throw new api_errors_1.default(409, "User already exists with credentials");
            }
            // Generate tokens for the existing user
            const tokens = (0, generate_token_1.generateTokens)(existingUser);
            return done(null, existingUser);
        }
        const newUser = yield prisma_1.default.user.create({
            data: {
                googleId: profile.id,
                email: email,
                username: profile.displayName,
            },
        });
        // Generate tokens for the new user
        const tokens = (0, generate_token_1.generateTokens)(newUser);
        done(null, newUser);
    }
    catch (error) {
        done(error, undefined);
    }
})));

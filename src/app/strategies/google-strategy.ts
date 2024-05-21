import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import prisma from "../../libs/prisma";
import ApiError from "../../errors/api-errors";
import { generateTokens } from "../../helpers/generate-token";

const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0].value) {
          throw new Error("Google account does not have an email.");
        }
        const email = profile.emails[0].value;

        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ googleId: profile.id }, { email: email }],
          },
        });

        if (existingUser) {
          if (!existingUser.googleId) {
            throw new ApiError(409, "User already exists with credentials");
          }

          // Generate tokens for the existing user
          const tokens = generateTokens(existingUser);
          return done(null, existingUser);
        }

        const newUser = await prisma.user.create({
          data: {
            googleId: profile.id,
            email: email,
            username: profile.displayName,
          },
        });

        // Generate tokens for the new user
        const tokens = generateTokens(newUser);

        done(null, newUser);
      } catch (error: any) {
        done(error, undefined);
      }
    }
  )
);

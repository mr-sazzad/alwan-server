import { User } from "@prisma/client";
import { jwtHelpers } from "./jwtHelpers";

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export const generateTokens = (user: User) => {
  const accessToken = jwtHelpers.createToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessTokenSecret,
    "15m"
  );
  const refreshToken = jwtHelpers.createToken(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    refreshTokenSecret,
    "30d"
  );

  return { accessToken, refreshToken };
};

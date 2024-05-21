import { User } from "@prisma/client";
import { userRole } from "../../constants/user-role";
import ApiError from "../../errors/api-errors";
import prisma from "../../libs/prisma";
import bcrypt from "bcryptjs";
import { LoginCredentials, LoginUserTokens } from "../../types";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { generateToken, sendEmail } from "../../utils/utils";
import { generateTokens } from "../../helpers/generate-token";

const signupUserWithCredentials = async (user: User): Promise<User | null> => {
  const email = user.email;

  if (user.role === userRole.admin) {
    throw new ApiError(401, "you are not authorized");
  }

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User already exists with this credentials");
  }

  if (user.password) {
    // Only hash the password if it's not null
    user.password = await bcrypt.hash(user.password, 12);
  }

  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};

const signInUserWithCredentials = async (
  user: LoginCredentials
): Promise<LoginUserTokens> => {
  const email = user.email;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(500, "Internal Server Error Please try again later");
  }

  if (isUserExist.password) {
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      isUserExist?.password
    );

    if (!isPasswordMatch) {
      throw new Error("Password does not match");
    }
  }

  // const credentials = {
  //   id: isUserExist.id,
  //   email: isUserExist.email,
  //   name: isUserExist.username,
  //   role: isUserExist.role,
  // };

  // const accessToken = jwtHelpers.createToken(credentials, secret, "1d");
  // const refreshToken = jwtHelpers.createToken(credentials, secret, "365d");

  const { accessToken, refreshToken } = generateTokens(isUserExist);

  return {
    accessToken,
    refreshToken,
  };
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "No user found with this email");
  }

  const token = generateToken();
  const expiresAt = new Date(Date.now() + 3600000);

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { userId: user.id },
  });

  if (existingToken) {
    // Update the existing token
    await prisma.passwordResetToken.update({
      where: { id: existingToken.id },
      data: {
        token,
        expiresAt,
      },
    });
  } else {
    // Create a new token
    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });
  }

  await sendEmail(email, token);
};

export const authServices = {
  signupUserWithCredentials,
  signInUserWithCredentials,
  forgotPassword,
};

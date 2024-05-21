import { RequestHandler } from "express";
import { authServices } from "./auth-service";
import sendResponse from "../../helpers/send-response";
import { generateTokens } from "../../helpers/generate-token";

const signUpWithCredentials: RequestHandler = async (req, res, next) => {
  try {
    const file = req.file;
    const credential = req.body;
    console.log("🚀🚀🚀 CREDENTIAL =>", credential);
    console.log("🚀🚀🚀 FILE =>", file);

    const signedUpUser = await authServices.signupUserWithCredentials(
      credential
    );

    sendResponse(res, 201, "User Signed Up Successfully", signedUpUser);
  } catch (error: any) {
    next(error);
  }
};

const signInWithCredentials: RequestHandler = async (req, res, next) => {
  try {
    const credential = req.body;
    const result = await authServices.signInUserWithCredentials(credential);

    const { refreshToken } = result;

    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict" as const,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    sendResponse(res, 200, "User Signed In Successfully", result);
  } catch (error: any) {
    next(error);
  }
};

const forgotPassword: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  try {
    const result = await authServices.forgotPassword(email);
    res.status(200).json({
      status: 200,
      message: "Email sent successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const googleLoginSuccess: RequestHandler = (req, res, next) => {
  try {
    const user = req.user as any;
    const tokens = generateTokens(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: tokens,
    });
  } catch (error: any) {
    next(error);
  }
};

const googleLoginFailure: RequestHandler = (req, res, next) => {
  res.status(400).json({
    success: false,
    message: "Login failed",
    data: null,
  });
};

export const authController = {
  signUpWithCredentials,
  signInWithCredentials,
  forgotPassword,
  googleLoginSuccess,
  googleLoginFailure,
};

import passport from "passport";
import { NextFunction, Request, Response, Router } from "express";
import "../strategies/google-strategy";
import { authController } from "./auth-controller";
import validateRequest from "../../middlewares/validate-request";
import { insertUserSchema, loginUserSchema } from "./auth-validation";
import upload from "../../config/multer-config";

const router = Router();

// Credentials auth routes
router.post(
  "/sign-up",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = insertUserSchema.parse(JSON.parse(req.body.data));
    console.log("req.body => ", req.body);
    return authController.signUpWithCredentials(req, res, next);
  }
);
router.post(
  "/sign-in",
  validateRequest(loginUserSchema),
  authController.signInWithCredentials
);

router.post("/forgot-password", authController.forgotPassword);

// google auth route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// google auth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/v1/auth/google/login/success",
    failureRedirect: "/api/v1/auth/google/login/failure",
  })
);

// google auth callback success and failure routes
router.get("/google/login/success", authController.googleLoginSuccess);
router.get("/google/login/failure", authController.googleLoginFailure);

export const authRoutes = router;

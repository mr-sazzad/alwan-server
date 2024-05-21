"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
require("../strategies/google-strategy");
const auth_controller_1 = require("./auth-controller");
const validate_request_1 = __importDefault(require("../../middlewares/validate-request"));
const auth_validation_1 = require("./auth-validation");
const multer_config_1 = __importDefault(require("../../config/multer-config"));
const router = (0, express_1.Router)();
// Credentials auth routes
router.post("/sign-up", multer_config_1.default.single("file"), (req, res, next) => {
    req.body = auth_validation_1.insertUserSchema.parse(JSON.parse(req.body.data));
    console.log("req.body => ", req.body);
    return auth_controller_1.authController.signUpWithCredentials(req, res, next);
});
router.post("/sign-in", (0, validate_request_1.default)(auth_validation_1.loginUserSchema), auth_controller_1.authController.signInWithCredentials);
router.post("/forgot-password", auth_controller_1.authController.forgotPassword);
// google auth route
router.get("/google", passport_1.default.authenticate("google", { scope: ["email", "profile"] }));
// google auth callback route
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "/api/v1/auth/google/login/success",
    failureRedirect: "/api/v1/auth/google/login/failure",
}));
// google auth callback success and failure routes
router.get("/google/login/success", auth_controller_1.authController.googleLoginSuccess);
router.get("/google/login/failure", auth_controller_1.authController.googleLoginFailure);
exports.authRoutes = router;

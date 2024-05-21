"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselRoutes = void 0;
const express_1 = require("express");
const carousel_controller_1 = require("./carousel-controller");
const router = (0, express_1.Router)();
router.post("/create", carousel_controller_1.carouselController.createCarousel);
router.patch("/update/:id", carousel_controller_1.carouselController.updateCarousel);
exports.carouselRoutes = router;

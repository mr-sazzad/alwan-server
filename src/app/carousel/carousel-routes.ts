import { Router } from "express";
import { carouselController } from "./carousel-controller";

const router = Router();

router.post("/create", carouselController.createCarousel);

router.patch("/update/:id", carouselController.updateCarousel);

export const carouselRoutes = router;

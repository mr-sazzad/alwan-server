import { RequestHandler } from "express";
import { carouselService } from "./carousel-service";
import sendResponse from "../../helpers/send-response";

const createCarousel: RequestHandler = async (req, res, next) => {
  try {
    const createdCarousel = await carouselService.createCarousel(req.body);

    sendResponse(res, 201, "Carousel created successfully", createdCarousel);
  } catch (err) {
    next(err);
  }
};

const updateCarousel: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const createdCarousel = await carouselService.updateCarousel(id, req.body);

    sendResponse(res, 201, "Carousel created successfully", createdCarousel);
  } catch (err) {
    next(err);
  }
};

export const carouselController = {
  createCarousel,
  updateCarousel,
};

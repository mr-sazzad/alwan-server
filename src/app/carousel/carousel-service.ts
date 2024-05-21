import { Carousel } from "@prisma/client";
import prisma from "../../libs/prisma";
import ApiError from "../../errors/api-errors";

const createCarousel = async (data: Carousel) => {
  try {
    const createdCarousel = await prisma.carousel.create({
      data,
    });
    return createdCarousel;
  } catch (err) {
    throw new ApiError(401, "Carousel Not Created");
  }
};

const updateCarousel = async (carouselId: string, data: Partial<Carousel>) => {
  try {
    const updatedCarousel = await prisma.carousel.update({
      where: { id: carouselId },
      data,
    });

    return updatedCarousel;
  } catch (err) {
    throw new ApiError(401, "Carousel Not Updated");
  }
};

export const carouselService = {
  createCarousel,
  updateCarousel,
};

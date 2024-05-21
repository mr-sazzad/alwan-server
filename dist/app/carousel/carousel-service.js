"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselService = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const api_errors_1 = __importDefault(require("../../errors/api-errors"));
const createCarousel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdCarousel = yield prisma_1.default.carousel.create({
            data,
        });
        return createdCarousel;
    }
    catch (err) {
        throw new api_errors_1.default(401, "Carousel Not Created");
    }
});
const updateCarousel = (carouselId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCarousel = yield prisma_1.default.carousel.update({
            where: { id: carouselId },
            data,
        });
        return updatedCarousel;
    }
    catch (err) {
        throw new api_errors_1.default(401, "Carousel Not Updated");
    }
});
exports.carouselService = {
    createCarousel,
    updateCarousel,
};

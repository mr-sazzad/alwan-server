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
exports.carouselController = void 0;
const carousel_service_1 = require("./carousel-service");
const send_response_1 = __importDefault(require("../../helpers/send-response"));
const createCarousel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdCarousel = yield carousel_service_1.carouselService.createCarousel(req.body);
        (0, send_response_1.default)(res, 201, "Carousel created successfully", createdCarousel);
    }
    catch (err) {
        next(err);
    }
});
const updateCarousel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const createdCarousel = yield carousel_service_1.carouselService.updateCarousel(id, req.body);
        (0, send_response_1.default)(res, 201, "Carousel created successfully", createdCarousel);
    }
    catch (err) {
        next(err);
    }
});
exports.carouselController = {
    createCarousel,
    updateCarousel,
};

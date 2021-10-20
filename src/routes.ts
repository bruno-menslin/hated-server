import { Router } from "express";
import { FeatureController } from "./controllers/FeatureController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const featureController = new FeatureController();

router.post('/users', userController.create);

router.post('/features', featureController.create)

export { router };
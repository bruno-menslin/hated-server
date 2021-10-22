import { Router } from "express";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FeatureController } from "./controllers/FeatureController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const featureController = new FeatureController();
const authenticationController = new AuthenticationController();

router.post('/login', authenticationController.login);

router.post('/users', userController.create);

router.post('/features', featureController.create)

export { router };
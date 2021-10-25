import { Router } from "express";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FeatureController } from "./controllers/FeatureController";
import { UserController } from "./controllers/UserController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const userController = new UserController();
const featureController = new FeatureController();
const authenticationController = new AuthenticationController();

router.post('/login', authenticationController.login);

router.post('/users', userController.create);
router.get('/users', ensureAuthenticated, ensureAdmin, userController.find);
router.get('/users/:id', ensureAuthenticated, userController.findOne);

router.post('/features', ensureAuthenticated, ensureAdmin, featureController.create);

export { router };
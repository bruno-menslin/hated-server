import { Router } from "express";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { FeatureController } from "./controllers/FeatureController";
import { UserController } from "./controllers/UserController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { SpotController } from "./controllers/SpotController";

const router = Router();

const userController = new UserController();
const featureController = new FeatureController();
const authenticationController = new AuthenticationController();
const spotController = new SpotController();

router.post('/login', authenticationController.login);

router.post('/features', ensureAuthenticated, ensureAdmin, featureController.create);
router.get('/features', ensureAuthenticated, featureController.find)

router.post('/users', userController.create);
router.get('/users', ensureAuthenticated, ensureAdmin, userController.find);
router.get('/users/:id', ensureAuthenticated, userController.findOne);
router.get('/users/:id/spots', ensureAuthenticated, userController.findSpots);
router.put('/users/:id', ensureAuthenticated, userController.update);

router.post('/spots', ensureAuthenticated, spotController.create);
router.get('/spots', spotController.find);
router.get('/spots/:code', spotController.findOne);
router.put('/spots/:code', ensureAuthenticated, spotController.update);
router.delete('/spots/:code', ensureAuthenticated, spotController.delete);

export { router };
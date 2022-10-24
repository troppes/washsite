import userController from '../controllers/user.controller.js';
import * as express from 'express';

const router = express.Router()

router.get("/", userController.listUsers);
router.post("/", userController.createUser);
router.get("/id/:id", userController.getUserById);
router.get("/name/:name", userController.getUserByUsername);

export default router;
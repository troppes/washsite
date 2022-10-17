import machinesController from '../controllers/machines.controller.js';
import * as express from 'express';

const router = express.Router()

router.get("/", machinesController.getAllItems);
router.get("/:id", machinesController.getItemById)

export default router
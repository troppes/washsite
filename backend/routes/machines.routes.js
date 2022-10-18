import machinesController from '../controllers/machines.controller.js';
import * as express from 'express';

const router = express.Router()

router.get("/", machinesController.getAllMachines);
router.get("/:name", machinesController.getMachineById);
router.get("/:id", machinesController.getMachineByName)

export default router
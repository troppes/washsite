import machinesController from '../controllers/machines.controller.js';
import * as express from 'express';

const router = express.Router()

router.get("/", machinesController.getAllMachines);
router.get("/:id", machinesController.getMachineByName);
router.get("/:name", machinesController.getMachineById);

export default router;
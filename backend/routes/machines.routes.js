import machinesController from '../controllers/machines.controller.js';
import * as express from 'express';

const router = express.Router()

router.get("/", machinesController.getAllMachines);
router.get("/id/:id", machinesController.getMachineById);
router.get("/name/:name", machinesController.getMachineByName);
router.delete("/id/:id", machinesController.deleteMachineById);
router.delete("/name/:name", machinesController.deleteMachineByName);
router.put("/", machinesController.addNewMachine);
router.post("/id/:id", machinesController.modifyMachineById);
router.post("/name/:name", machinesController.modifyMachineByName);

export default router;
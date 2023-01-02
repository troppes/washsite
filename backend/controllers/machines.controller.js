import repository from '../repositories/repository.js';
import statuscodes from "../lib/statuscodes.js";

export default class {
    static async getAllMachines(req, res) {
        try {
            let machines = await repository.getAllMachines();
            return res.send({ machines });
        } catch (e) {
            statuscodes.send409(res, e);
        }
    };
    static async getMachineById(req, res) {
        try {
            let machine = await repository.getMachineById(req.params.id)
            if (machine === undefined) {
                statuscodes.send404(res, 'Machine not found');
            } else {
                return res.send({ machine });
            }
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }
    static async getMachineByName(req, res) {
        try {
            let machine = await repository.getMachineByName(req.params.name);
            if (machine === undefined) {
                statuscodes.send404(res, 'Machine not found');
            } else {
                return res.send({ machine });
            }
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }
    static async deleteMachineById(req, res) {
        try {
            const machine = await repository.deleteMachineById(req.params.id);
            if (machine['changes'] !== 0) {
                statuscodes.send200(res, 'Machine deleted successfully');
            } else {
                statuscodes.send404(res, 'Machine not found');
            }
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }
    static async deleteMachineByName(req, res) {
        try {
            const machine = await repository.deleteMachineByName(req.params.name);
            if (machine['changes'] !== 0) {
                statuscodes.send200(res, 'Machine deleted successfully');
            } else {
                statuscodes.send404(res, 'Machine not found');
            }
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }
    static async addNewMachine(req, res) {
        try {
            await repository.addNewMachine(req.body.name, req.body.status, req.body.running_threshold, req.body.spinning_threshold);
            statuscodes.send200(res, 'Machine added successfully');
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }
    static async modifyMachineById(req, res) {
        try {
            const machine = await repository.modifyMachineById(
                req.params.id,
                req.body.name,
                req.body.status,
                req.body.running_treshold,
                req.body.spinning_treshold);
            if (machine.hasOwnProperty('changes')) {
                statuscodes.send200(res, 'Machine modified successfully');
            } else {
                statuscodes.send404(res, 'Machine not found');
            }
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }
    static async modifyMachineByName(req, res) {
        try {
            const machine = await repository.modifyMachineByName(
                req.params.name,
                req.body.name,
                req.body.status,
                req.body.running_treshold,
                req.body.spinning_treshold);
            if (machine.hasOwnProperty('changes')) {
                statuscodes.send200(res, 'Machine modified successfully');
            } else {
                statuscodes.send404(res, 'Machine not found');
            }
        } catch (e) {
            statuscodes.send409(res, e);
        }
    }

}
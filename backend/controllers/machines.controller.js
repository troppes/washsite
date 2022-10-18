import repository from '../repositories/repository.js';

export default class {
    static async getAllMachines(req, res) {
        let machines = await repository.getAllMachines();
        return res.send({ machines });
    };

    static async getMachineById(req, res) {
        let machine = await repository.getMachineById(req.params.id)
        return res.send({ machine });
    }

    static async getMachineByName(req, res) {
        let machine = await repository.getMachineByName(req.params.id)
        return res.send({ machine });
    }

}
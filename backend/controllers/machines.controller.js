import repository from '../repositories/repository.js';

export default class {
    static async getAllItems(req, res) {
        let items = await repository.getAllItems();
        return res.send({ items });
    };

    static async getItemById(req, res) {
        let item = await repository.getItemById(req.params.id)
        return res.send({ item });
    }

}
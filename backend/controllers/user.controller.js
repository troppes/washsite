import repository from '../repositories/repository.js';
import {encodeToken} from '../middleware/auth.middleware.js';
import * as bcrypt from 'bcrypt';

export default class {
    static async createUser(req, res) {
        return res.send('lol');
    }

    static async listUsers(req, res) {
        let users = await repository.getAllUsers();
        return res.send({users});
    }

    static async getUserByUsername(req, res) {
        let user = await repository.getUserByUsername(req.params.name)
        return res.send({user});
    }

    static async getUserById(req, res) {
        let user = await repository.getUserById(req.params.id)
        return res.send({user});
    }
}

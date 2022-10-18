import dao from './dao.js';

export default class {
    static async getAllMachines() {
        return await dao.all("SELECT * FROM machines", [])
    }

    static async getAllUsers() {
        return await dao.all("SELECT * FROM users", [])
    }

    static async getMachineById(id) {
        return await dao.get("SELECT * FROM machines WHERE id = ?", [id])
    }

    static async getMachineByName(name) {
        return await dao.get("SELECT * FROM machines WHERE name = ?", [name])
    }

    static async getUserByUsername(username) {
        return dao.get("SELECT * FROM users WHERE username = ?", [username]);
    }

    static async getUserById(id) {
        return dao.get('SELECT * FROM users WHERE id = ?', [id]);
    }
}
import dao from './dao.js';

export default class {
    static async getAllMachines() {
        return await dao.all("SELECT * FROM machines", []);
    }

    static async getMachineById(id) {
        return await dao.get("SELECT * FROM machines WHERE id = ?", [id]);
    }

    static async getMachineByName(name) {
        return await dao.get("SELECT * FROM machines WHERE name = ?", [name]);
    }

    static async deleteMachineById(id) {
        return await dao.run("DELETE FROM machines WHERE id = ?", [id]);
    }

    static async deleteMachineByName(name) {
        return await dao.run("DELETE FROM machines WHERE name = ?", [name]);
    }

    static async addNewMachine(name, status) {
        return await dao.run("INSERT INTO machines (name, status) VALUES (?, ?)", [name, status]);
    }

    static async modifyMachineById(id, name = null, status = null) {
        if(name === null || status === null) {
            const { oldName, oldStatus } = await this.getMachineById(id);
            name = name || oldName;
            status = status || oldStatus;
        }
        return await dao.run("UPDATE machines SET name = ?, status = ? WHERE id = ?", [name, status, id])
    }

    static async modifyMachineByName(name, status) {
        return await dao.run("UPDATE machines SET status = ? WHERE id = ?", [status, name])
    }
    
    static async getAllUsers() {
        return await dao.all("SELECT * FROM users", []);
    }

    static async getUserByUsername(username) {
        return dao.get("SELECT * FROM users WHERE username = ?", [username]);
    }

    static async getUserById(id) {
        return dao.get('SELECT * FROM users WHERE id = ?', [id]);
    }
}
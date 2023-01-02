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

    static async addNewMachine(name, status, runT, spinT) {
        return await dao.run("INSERT INTO machines (name, status, running_threshold, spinning_threshold) VALUES (?, ?, ?, ?)", [name, status, runT, spinT]);
    }

    static async modifyMachineById(id, newName = null, newStatus = null, newRunT = null, newSpinT = null) {
        if (newName === null || newStatus === null || newRunT === null || newSpinT === null) {
            try {
                const { name, status, runT, spinT } = await this.getMachineById(id);
                newName = newName || name;
                newStatus = newStatus || status;
                newRunT = newRunT || runT;
                newSpinT = newSpinT || spinT;
            } catch (e) {
                console.log(e);
                return e;
            }
        }
        return await dao.run(
            "UPDATE machines SET name = ?, status = ?, running_threshold = ?, spinning_threshold = ? WHERE id = ?",
            [newName, newStatus, newRunT, newSpinT, id]
        )
    }

    static async modifyMachineByName(currentName, newName = null, newStatus = null, newRunT = null, newSpinT = null) {
        if (newName === null || newStatus === null || newRunT === null || newSpinT === null) {
            try {
                const { name, status, running_threshold, spinning_threshold } = await this.getMachineById(id);
                newName = newName || name;
                newStatus = newStatus || status;
                newRunT = newRunT || running_threshold;
                newSpinT = newSpinT || spinning_threshold;
            } catch (e) {
                console.log(e);
                return e;
            }
        }
        return await dao.run(
            "UPDATE machines SET name = ?, status = ?, running_threshold = ?, spinning_threshold = ? WHERE name = ?",
            [newName, newStatus, newRunT, newSpinT, currentName]);
    }

    static async getAllUsers() {
        return await dao.all("SELECT * FROM users", []);
    }

    static async getUserById(id) {
        return dao.get('SELECT * FROM users WHERE id = ?', [id]);
    }

    static async getUserByName(name) {
        return dao.get('SELECT * FROM users WHERE name = ?', [name]);
    }

    static async addNewUser(name, hash, type) {
        return await dao.run("INSERT INTO users (name, password_hash, type) VALUES (?, ?, ?)", [name, hash, type]);
    }

    static async modifyUserById(id, newName = null, newPasswordHash = null, newType = null) {
        if (newName === null || newPasswordHash === null || newType == null) {
            try {
                const { name, password_hash, type } = await this.getUserById(id);
                newName = newName || name;
                newPasswordHash = newPasswordHash || password_hash;
                newType = newType || type;
            } catch (e) {
                console.log(e);
                return e;
            }
        }
        return await dao.run("UPDATE users SET name = ?, password_hash = ?, type = ? WHERE id = ?", [newName, newPasswordHash, newType, id]);
    }

    static async deleteUserById(id) {
        return await dao.run("DELETE FROM users WHERE id = ?", [id]);
    }

}
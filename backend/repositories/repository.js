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

    static async modifyMachineById(id, newName = null, newStatus = null) {
        if(newName === null || newStatus === null) {
            try {
                const { name, status } = await this.getMachineById(id);
                newName = newName || name;
                newStatus = newStatus || status;
            } catch(e) {
                console.log(e);
                return e;
            }
        }
        return await dao.run("UPDATE machines SET name = ?, status = ? WHERE id = ?", [newName, newStatus, id])
    }

    static async modifyMachineByName(currentName, newName = null, newStatus = null) {
        if(newName === null || newStatus === null) {
            try {
                const { name, status } = await this.getMachineById(id);
                newName = newName || name;
                newStatus = newStatus || status;
            } catch(e) {
                console.log(e);
                return e;
            }
        }
        return await dao.run("UPDATE machines SET name = ?, status = ? WHERE name = ?", [newName, newStatus, currentName]);
    }
    
    static async getAllUsers() {
        return await dao.all("SELECT * FROM users", []);
    }

    static async getUserById(id) {
        return dao.get('SELECT * FROM users WHERE id = ?', [id]);
    }

    static async addNewUser(name, hash, type) {
        return await dao.run("INSERT INTO users (username, password, type) VALUES (?, ?, ?)", [name, hash, type]);
    }

    static async modifyUserById(id, newName = null, newPasswordHash = null, newType = null) {
        if(newName === null || newPasswordHash === null || newType == null) {
            try {
                const { username, password, type } = await this.getUserById(id);
                newName = newName || username;
                newPasswordHash = newPasswordHash || password;
                newType = newType || type;
            } catch(e) {
                console.log(e);
                return e;
            }
        }
        return await dao.run("UPDATE users SET username = ?, password = ?, type = ? WHERE id = ?", [newName, newPasswordHash, newType, id]);
    }

    static async deleteUserById(id) {
        return await dao.run("DELETE FROM users WHERE id = ?", [id]);
    }

}
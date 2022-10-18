import repository from '../repositories/repository.js';
import {encodeToken} from '../middleware/auth.middleware.js';
import * as bcrypt from 'bcrypt';

const basicAuthDecrypt = (authString) => {
    let userData = Buffer.from(authString.split(" ")[1], 'base64').toString().split(':');

    return {username: userData[0], password: userData[1]}
}

const returnInvalidCredentials = (res) => {
    res.status(401);
    return res.json({error: 'Invalid username or password'});

}

export const login = async (req, res) => {
    let {username, password} = basicAuthDecrypt(req.headers.authorization);
    const user = await repository.getUserByUsername(username)

    if (!user) {
        returnInvalidCredentials(res)
    } else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const accessToken = encodeToken({userId: user.id, type: user.type});
                return res.json({accessToken});
            } else {
                return returnInvalidCredentials(res);
            }
        });
    }
}
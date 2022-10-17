import njwt from 'njwt';
import repository from '../repositories/repository.js';

const {APP_SECRET = 'secret'} = process.env;

export const encodeToken = (tokenData) => {
    return njwt.create(tokenData, APP_SECRET).compact();
}

const decodeToken = (token) => {
    return njwt.verify(token, APP_SECRET).setExpiration();
}

export const authMiddleware = async (req, res, next) => {
    let token;
    if(req.header('Authorization')) {
        token = req.header('Authorization').split(" ")[1];
    }
    if (!token) {
        return next();
    }

    try {
        const decoded = decodeToken(token);
        const {userId} = decoded.body;
        const user = await repository.getUserById(userId)
        if (user) {
            req.userId = userId;
            req.userType = user.type;
        }
    } catch (e) {
        console.log("Token Error: " + e.message);
        return next();
    }

    next();
};

export const authenticated = (req, res, next) => {
    if (req.userId) {
        next();
    } else {
        res.status(401);
        res.json({error: 'User not authenticated'});
    }
}



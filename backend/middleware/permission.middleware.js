import statuscodes from "../lib/statuscodes.js";

let userTypes = {
    'admin': {
        routes: [
            {route: '/api/machines', rights: ['POST', 'GET', 'PUT', 'DELETE']},
            {route: '/api/auth', rights: ['POST', 'GET', 'PUT', 'DELETE']},
            {route: '/api/users', rights: ['POST', 'GET', 'PUT', 'DELETE']},
        ]
    },
    'machine': {
        routes: [
            {route: '/api/auth', rights: ['GET']},
            {route: '/api/machines', rights: ['POST', 'PUT']},
        ]
    },
    'display': {
        routes: [
            {route: '/api/machines', rights: ['GET']},
            {route: '/api/auth', rights: ['GET']}
        ]
    }
}


export const hasRights = (req, res, next) => {
    if (req.headers.authorization) {
        const auth = req.header('Authorization').split(" ");
        switch (auth[0]) {
            case 'Basic':
                return next();
            case 'Bearer':
                console.log(req.userType);
                const routes = userTypes[req.userType].routes;
                if (routes) {
                    // Find out if the URL exists in the rights table
                    const entry = routes.find((route) => (route.route.startsWith(req.baseUrl)));
                    if (entry) {
                        // Check if the the rights for the method are there
                        if (entry.rights.includes(req.method)) {
                            return next();
                        }
                    }
                }
                break;
        }
    }

    statuscodes.send403(res, 'User has no permissions to this ressource');

}


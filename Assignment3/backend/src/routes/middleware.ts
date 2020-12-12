import jwt from "express-jwt";

export const authRequired = jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: true
});

export const authCredentialsNotRequired = jwt({
    secret: process.env.JWT_SECRET as string,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    credentialsRequired: false
});

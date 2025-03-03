export const authorization = ( rol ) => {
    return async( req, res, next ) => {
    //Consultar si existe una sesion activa
        if(!req.user) return res.status(401).send({ error: "Not authenticated" });
        if(req.user.role != rol) return res.status(403).send({ error: "Not authorized"});
        next();
    }
}
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message:"Authorization token missing"
        })
    }
    const token = authHeader.split(" ")[1];
    try { 
        const verified = jwt.verify(token, JWT_USER_PASSWORD)
        req.userId = verified.id;
        next()
    } catch(error) {
        res.status(403).json({
            message:"Invalid or expired token"
        })
    }
}

module.exports = {
    authMiddleware
}
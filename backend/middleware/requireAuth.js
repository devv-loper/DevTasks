const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || process.env.JWT_USER_PASSWORD;

function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization ;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message:"Authorization token missing"
        })
    }
    const token = authHeader.split(" ")[1];
    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.userId = verified.id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

// Export the middleware function directly for simpler imports
module.exports = requireAuth;
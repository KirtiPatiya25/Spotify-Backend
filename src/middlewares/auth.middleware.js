const jwt = require("jsonwebtoken");

// 🔐 AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized: No token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({
            message: "Unauthorized: Invalid token",
        });
    }
};

// 🎭 ROLE CHECK MIDDLEWARE (🔥 ADD THIS)
const isArtist = (req, res, next) => {
    if (req.user.role !== "artist") {
        return res.status(403).json({
            message: "Access denied: Artists only",
        });
    }
    next();
};

// ✅ EXPORT BOTH
module.exports = authMiddleware;
module.exports.isArtist = isArtist;
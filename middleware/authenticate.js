const jwt = require('jsonwebtoken');

/**
 * Middleware: Verifies JWT token from Authorization header.
 * Attaches decoded payload (id, role) to req.user.
 */
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token tidak ditemukan. Silakan login kembali.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa. Silakan login kembali.' });
    }
};

module.exports = authenticate;

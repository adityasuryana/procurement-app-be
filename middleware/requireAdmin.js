/**
 * Middleware: Requires the authenticated user to have the 'Admin' role.
 * Must be used AFTER the `authenticate` middleware.
 */
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya Admin yang dapat melakukan tindakan ini.' });
    }
    next();
};

module.exports = requireAdmin;

const { User } = require('../models');

/**
 * Middleware: Requires the authenticated user to have the 'Administrator' role.
 * Must be used AFTER the `authenticate` middleware.
 */
const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: 'Akses ditolak. Silakan login kembali.' });
        }
        
        const user = await User.findByPk(req.user.id);
        if (!user || user.role !== 'Administrator') {
            return res.status(403).json({ message: 'Akses ditolak. Hanya Administrator yang dapat melakukan tindakan ini.' });
        }
        
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = requireAdmin;

// middleware/adminAuth.js
const authenticate = require('./authenticate'); // Assuming you already have an authenticate middleware

const adminAuth = (req, res, next) => {
    authenticate(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        next();
    });
};

module.exports = adminAuth;

const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Missing authentication token' });
        }

        const decoded = jwt.verify(token, 'secretKey');
        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error('Error during token authentication:', error);
        res.status(401).json({ message: 'Invalid authentication token' });
    }
};
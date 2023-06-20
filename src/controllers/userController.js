const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error while fetching user profile:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User profile updated successfully', user });
    } catch (error) {
        console.error('Error while updating user profile:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
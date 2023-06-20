const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne({
            $or: [
                { login: login },
                { email: login },
                { phone: login }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid login or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid login or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey');

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, login, email, phone, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ login }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the provided login or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            login,
            email,
            phone,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
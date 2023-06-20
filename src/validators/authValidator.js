const Joi = require('joi');

exports.validateLogin = (req, res, next) => {
    const schema = Joi.object({
        login: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

exports.validateRegistration = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        login: Joi.string().min(3).max(30).regex(/^[A-Za-z0-9]+$/).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\+380\d{9}$/).required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/)
            .required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
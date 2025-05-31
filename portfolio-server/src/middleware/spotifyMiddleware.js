// genereated by ChatGPT idk if it works or not implement later

// spotifyValidation.js
const Joi = require('joi');

// 1) Define the Joi schema for query parameters
const callbackQuerySchema = Joi.object({
    code: Joi.string().required().messages({
        'any.required': '`code` is required',
        'string.empty': '`code` cannot be empty',
    }),
    state: Joi.string().required().messages({
        'any.required': '`state` is required',
        'string.empty': '`state` cannot be empty',
    }),
});

// 2) Middleware factory: validate req.query against the schema
function validateCallbackQuery(req, res, next) {
    const { error, value } = callbackQuerySchema.validate(req.query, {
        abortEarly: false,     // collect all errors, not just the first
        stripUnknown: true,    // remove unknown keys from req.query
    });

    if (error) {
        // If validation fails, respond with 400 and details
        const details = error.details.map((d) => d.message);
        return res.status(400).json({
            error: 'Invalid query parameters',
            details,
        });
    }

    // Replace req.query with the validated/stripped value
    req.query = value;
    next();
}

module.exports = {
    validateCallbackQuery,
};

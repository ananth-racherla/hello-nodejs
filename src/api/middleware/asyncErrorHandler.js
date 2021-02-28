/**
 * Async error handling middleware. Wrapper around async routes.
 * Catches unhandled promise rejects and passes this on to the global
 * error handler within config/lib/express.js
 */
export const asyncErrorHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        next(error);
    });
};

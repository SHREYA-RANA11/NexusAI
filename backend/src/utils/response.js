const success = (res, data, status = 200) => {
    return res.status(status).json({
        status: 'success',
        data
    });
};

const error = (res, message, status = 500, details = null) => {
    return res.status(status).json({
        status: 'error',
        message,
        ...(details && { details })
    });
};

module.exports = {
    success,
    error
};

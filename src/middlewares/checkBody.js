const ApiError = require('../utils/ApiError');

const checkBody = (req, res, next) => {
  try {
    const { name, age, address } = req.body;

    if (!name) {
      next(
        new ApiError(
          'name must be required!',
          400
        )
      );
    } else if (!age) {
      next(
        new ApiError('age must be reqired', 400)
      );
    } else if (!address) {
      next(
        new ApiError(
          'address must be required',
          400
        )
      );
    }

    next();
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      message: `${err.message}`,
    });
  }
};

module.exports = checkBody;

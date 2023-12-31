const ApiError = require('../utils/ApiError');

const checkCarBodyRequire = (req, res, next) => {
  try {
    const { name, type } = req.body;
    const image = req.file;

    if (!name) {
      next(
        new ApiError(
          'name must be required!',
          400
        )
      );
    } else if (!type) {
      next(
        new ApiError('type must be reqired', 400)
      );
    } else if (!image) {
      next(
        new ApiError('image must be reqired', 400)
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

module.exports = checkCarBodyRequire;

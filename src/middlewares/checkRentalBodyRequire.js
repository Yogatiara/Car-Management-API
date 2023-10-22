const ApiError = require('../utils/ApiError');

const checkRentalBodyRequire = (
  req,
  res,
  next
) => {
  try {
    const { price, carId } = req.body;

    if (!price) {
      next(
        new ApiError(
          'price must be required!',
          400
        )
      );
    } else if (!carId) {
      next(
        new ApiError(
          'carId must be required',
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

module.exports = checkRentalBodyRequire;

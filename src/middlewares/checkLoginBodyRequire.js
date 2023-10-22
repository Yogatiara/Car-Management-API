const ApiError = require('../utils/ApiError');

const checkRegisterBodyRequire = (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      next(
        new ApiError(
          'email must be required!',
          400
        )
      );
    } else if (!password) {
      next(
        new ApiError(
          'password must be reqired',
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

module.exports = checkRegisterBodyRequire;

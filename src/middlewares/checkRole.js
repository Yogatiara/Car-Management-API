const ApiError = require('../utils/ApiError');

const checkRole = (...role) => {
  return async (req, res, next) => {
    try {
      if (
        req.user.role !== role[0] &&
        req.user.role !== role[1]
      ) {
        next(
          new ApiError(
            `you are not ${role[0]} or ${role[1]}, so you can't access it!`,
            401
          )
        );
      }
      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;

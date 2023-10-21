const multer = require('multer');
const ApiError = require('../utils/ApiError');

const imageFiltering = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    return cb(
      new ApiError(
        'image format must be png/jpg/jpeg',
        400
      )
    );
  }
};

const upload = multer({
  fileFilter: imageFiltering,
});

module.exports = upload;

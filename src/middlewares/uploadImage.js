const multer = require('multer');
const ApiError = require('../utils/ApiError');

const imageFiltering = (req, file, cb) => {
  console.log(file.mimetype);
  cb(null, true);
};

const upload = multer({
  filtering: imageFiltering,
});

module.exports = upload;

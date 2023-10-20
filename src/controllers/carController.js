const { Car } = require('../models');
const ApiError = require('../utils/ApiError');
const imagekit = require('../../lib/imagekit');

const createCar = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const file = req.file;
    let image;

    if (file) {
      const splitNameFile =
        file.originalname.split('.');
      const extentionFile =
        splitNameFile[splitNameFile.length - 1];

      const uploadImage = await imagekit.upload({
        file: file.buffer,
        fileName: `${file.name}.${extentionFile}`,
      });

      image = uploadImage.url;

      const newCar = await Car.create({
        name: name,
        type: type,
      });
    }

    res.status(200).json({
      status: 'Success',
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findCar = async (req, res, next) => {
  try {
    const carData = await Car.findAll();
    if (carData == 0) {
      return next(
        new ApiError(
          'Car database is empty!',
          400
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        carData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (userData == 0) {
      return next(
        new ApiError('Database is empty!', 400)
      );
    } else if (userData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        userData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (userData == 0) {
      return next(
        new ApiError('Database is empty!', 400)
      );
    } else if (userData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const updatedUser = await User.update(
      {
        name: name,
        age: age,
        address: address,
        role: role,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    res.status(200).json({
      status: 'success',
      data: {
        update_user: {
          updatedUser,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (userData == 0) {
      return next(
        new ApiError('Database is empty!', 400)
      );
    } else if (userData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        deleted_user: {
          deletedUser,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const clearUser = async (req, res, next) => {
  try {
    const userData = await User.findAll();

    if (userData == 0) {
      return next(
        new ApiError('Database is empty!', 400)
      );
    }

    const userCleared = await User.destroy({
      where: {},
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user_cleared: {
          userCleared,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createCar,
  findCar,
  // findUserById,
  // updateUser,
  // deleteUser,
  // clearUser,
};

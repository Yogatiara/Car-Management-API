const { Car } = require('../models');
const ApiError = require('../utils/ApiError');
const imagekit = require('../../lib/imagekit');

const createCar = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const file = req.file;
    const splitNameFile =
      file.originalname.split('.');
    const extentionFile =
      splitNameFile[splitNameFile.length - 1];
    const nameFile =
      splitNameFile[splitNameFile.length - 2];

    const uploadImage = await imagekit.upload({
      file: file.buffer,
      fileName: `${nameFile}.${extentionFile}`,
    });

    const newCar = await Car.create({
      name: name,
      type: type,
      image: uploadImage.url,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        carData: {
          newCar,
        },
      },
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

const findCarById = async (req, res, next) => {
  try {
    const carData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (userData === null) {
      return next(
        new ApiError('data is not found!', 400)
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

const updateCar = async (req, res, next) => {
  try {
    const { name, type, image } = req.body;
    const carData = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (carData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const updatedCar = await Car.update(
      {
        name: name,
        type: type,
        image: image,
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
        update_car: {
          updatedCar,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const carData = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (carData == 0) {
      return next(
        new ApiError('Database is empty!', 400)
      );
    } else if (carData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const deletedCar = await Car.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        deleted_car: {
          deletedCar,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const clearCar = async (req, res, next) => {
  try {
    const carData = await Car.findAll();

    if (carData == 0) {
      return next(
        new ApiError('Database is empty!', 400)
      );
    }

    const carCleared = await Car.destroy({
      where: {},
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        car_cleared: {
          carCleared,
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
  findCarById,
  updateCar,
  deleteCar,
  clearCar,
};

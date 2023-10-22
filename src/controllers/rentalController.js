const {
  Rental,
  Car,
  User,
} = require('../models');
const ApiError = require('../utils/ApiError');

const createRental = async (req, res, next) => {
  try {
    const { price, carId } = req.body;

    console.log('test1');
    const newRental = await Rental.create({
      price: price,
      carId: carId,
    });
    console.log('test2');

    res.status(200).json({
      status: 'Success',
      data: {
        dataRental: newRental,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findRental = async (req, res, next) => {
  try {
    const rentalData = await Rental.findAll({
      include: [Car, User],
    });
    if (rentalData == 0) {
      return next(
        new ApiError(
          'Rental database is empty!',
          400
        )
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        rentalData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findRentalById = async (req, res, next) => {
  try {
    const rentalData = await Rental.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (rentalData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        rentalData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateRental = async (req, res, next) => {
  try {
    const { price, carId } = req.body;
    const rentalData = await Rental.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (rentalData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const updatedRental = await Rental.update(
      {
        price: price,
        carId: carId,
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
        update_rental: {
          updatedRental,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteRental = async (req, res, next) => {
  try {
    const rentalData = await Rental.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (rentalData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const deletedRental = await Rental.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        deleted_rental: {
          deletedRental,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const clearRental = async (req, res, next) => {
  try {
    const rentalData = await Rental.findAll();

    if (rentalData == 0) {
      return next(
        new ApiError(
          'Rental database is empty!',
          400
        )
      );
    }

    const rentalCleared = await Rental.destroy({
      where: {},
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        Rental_cleared: {
          rentalCleared,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createRental,
  findRental,
  findRentalById,
  updateRental,
  deleteRental,
  clearRental,
};

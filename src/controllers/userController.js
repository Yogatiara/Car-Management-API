const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (req, res, next) => {
  try {
    const { name, age, address } = req.body;
    console.log(name);

    const newUser = await User.create({
      name: name,
      age: age,
      address: address,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        dataUser: newUser,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findUser = async (req, res, next) => {
  try {
    const userData = await User.findAll();
    if (userData == 0) {
      return next(
        new ApiError(
          'User database is empty!',
          400
        )
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

const findUserById = async (req, res, next) => {
  try {
    const userData = await User.findOne({
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

    if (userData === null) {
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

    if (userData === null) {
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
        new ApiError(
          'User databae is empty!',
          400
        )
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
  createUser,
  findUser,
  findUserById,
  updateUser,
  deleteUser,
  clearUser,
};

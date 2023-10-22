const bcrypt = require('bcrypt');

const { User, Auth } = require('../models');
const ApiError = require('../utils/ApiError');

const createAdmin = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      age,
      address,
      role,
    } = req.body;

    if (age <= 17) {
      return next(
        new ApiError(
          'Sorry, Not old enough to be an admin. ',
          403
        )
      );
    }
    const adminEmail = await Auth.findOne({
      where: {
        email,
      },
    });

    if (adminEmail) {
      return next(
        new ApiError(
          'User email already taken',
          400
        )
      );
    }

    const adminPhoneNumber = await Auth.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (adminPhoneNumber) {
      return next(
        new ApiError(
          'Telepon number already taken',
          400
        )
      );
    }

    const password = process.env.ADMIN_PASSWORD;

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      password,
      saltRounds
    );

    const newAdmin = await User.create({
      name: name,
      age: age,
      role: role,
      address: address,
    });

    const newAuth = await Auth.create({
      email: email,
      userId: newAdmin.id,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        dataAdmin: {
          ...newAdmin,
          ...newAuth,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const findAdmin = async (req, res, next) => {
  try {
    const adminData = await User.findOne({
      where: {
        role: req.query.role,
      },
    });

    if (adminData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    res.status(200).json({
      status: 'success',
      data: {
        adminData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;
    const adminData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (adminData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const updatedAdmin = await User.update(
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
        update_admin: {
          updatedAdmin,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const adminData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (adminData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const deletedAdmin = await User.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        deleted_admin: {
          deletedAdmin,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const clearAdmin = async (req, res, next) => {
  try {
    const adminData = await User.findAll();

    if (adminData == 0) {
      return next(
        new ApiError(
          'User databae is empty!',
          400
        )
      );
    }

    const adminCleared = await User.destroy({
      where: {},
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        admin_cleared: {
          adminCleared,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  createAdmin,
  findAdmin,
  findAdmin,
  updateAdmin,
  deleteAdmin,
  clearAdmin,
};

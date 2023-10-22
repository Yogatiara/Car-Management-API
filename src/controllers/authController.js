const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Auth, User } = require('../models');
const ApiError = require('../utils/ApiError');

const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      noTelepon,
      password,
      confirmPassword,
      age,
      address,
    } = req.body;

    const memberEmail = await Auth.findOne({
      where: {
        email,
      },
    });

    if (memberEmail) {
      next(
        new ApiError(
          'User email already taken',
          400
        )
      );
    }

    const memberNoTelepon = await Auth.findOne({
      where: {
        noTelepon,
      },
    });

    if (memberNoTelepon) {
      next(
        new ApiError(
          'Telepon number already taken',
          400
        )
      );
    }

    if (password <= 8) {
      next(
        new ApiError(
          'Minimum password must be 8 character'
        )
      );
    }

    if (password !== confirmPassword) {
      next(
        new ApiError(
          'password does not match',
          400
        )
      );
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      password,
      saltRounds
    );
    const hashedConfirmPassword = bcrypt.hashSync(
      confirmPassword,
      saltRounds
    );

    const newMember = await User.create({
      name: name,
      address: address,
      age: age,
    });

    const newAuth = await Auth.create({
      email,
      noTelepon,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    });

    res.status(201).json({
      status: 'Success',
      data: {
        ...newMember,
        ...newAuth,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email: email,
      },
      include: User,
    });

    if (
      user &&
      bcrypt.compareSync(password, user.password)
    ) {
      const token = jwt.sign(
        {
          id: user.userId,
          name: user.User.name,
          role: user.User.role,
          email: user.email,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        status: 'success',
        message: 'Login success',
        data: token,
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
};

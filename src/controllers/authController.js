const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Auth, User } = require('../models');
const ApiError = require('../utils/ApiError');

const checkToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(
        new ApiError('token is not found', 401)
      );
    }
    const token = bearerToken.split('Bearer ')[1];

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    delete payload.iat;

    res.status(200).json({
      data: {
        payload,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phoneNumber,
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
      return next(
        new ApiError(
          'User email already taken',
          400
        )
      );
    }

    const memberPhoneNumber = await Auth.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });

    if (memberPhoneNumber) {
      return next(
        new ApiError(
          'Telepon number already taken',
          400
        )
      );
    }

    if (password <= 8) {
      return next(
        new ApiError(
          'Minimum password must be 8 character'
        )
      );
    }

    if (password !== confirmPassword) {
      return next(
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
      userId: newMember.id,
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
          username: user.User.name,
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
  checkToken,
};

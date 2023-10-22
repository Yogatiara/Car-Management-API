const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const findMemberById = async (req, res, next) => {
  try {
    const memberData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (memberData === null) {
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

const updateMember = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;
    const memberData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (memberData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const updatedMember = await User.update(
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
        update_Member: {
          updatedMember,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const memberData = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (memberData === null) {
      return next(
        new ApiError('data is not found!', 400)
      );
    }

    const deletedMember = await User.destroy({
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        deleted_member: {
          deletedMember,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const clearMember = async (req, res, next) => {
  try {
    const memberData = await User.findAll();

    if (memberData == 0) {
      return next(
        new ApiError(
          'User databae is empty!',
          400
        )
      );
    }

    const memberCleared = await User.destroy({
      where: {},
      returning: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        member_cleared: {
          memberCleared,
        },
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  findMemberById,
  updateMember,
  deleteMember,
  clearMember,
};

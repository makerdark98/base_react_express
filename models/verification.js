// const User = require('./user.js');

module.exports = (sequelize, DataTypes) => {
  const Verification = sequelize.define('verification', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    timestamps: true,
  });
  /*
  Verification.hasOne(User, {
    foriegnKey: 'userID',
    constraints: false,
  });
  */

  return Verification;
};

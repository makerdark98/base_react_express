const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  userID: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  instanceMethods: {
    generateHash(password) {
      return bcrypt.hash(password, bcrypt.genSaltSync(8));
    },
    validPassword(password) {
      return bcrypt.compare(password, this.password);
    },
  },
});

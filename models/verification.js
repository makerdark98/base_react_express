module.exports = (sequelize, DataTypes) => sequelize.define('verification', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

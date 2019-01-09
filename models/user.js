module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

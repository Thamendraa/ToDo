module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_oauth_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return User;
};

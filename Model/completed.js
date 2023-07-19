module.exports = (sequelize, DataTypes) => {
  const Completed = sequelize.define("completed", {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Completed;
};

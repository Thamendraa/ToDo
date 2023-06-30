module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Task;
};

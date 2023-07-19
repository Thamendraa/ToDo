module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
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
  return Task;
};

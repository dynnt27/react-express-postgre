'use strict';
module.exports = (sequelize, DataTypes) => {
  var Class = sequelize.define('Class', {
    classId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    title: DataTypes.STRING,
    slots: DataTypes.INTEGER,
    description: DataTypes.STRING,
    activationCode: DataTypes.STRING
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
  };
  return Class;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define('Food', {
    uuid: DataTypes.STRING,
    username: DataTypes.STRING,
    description: DataTypes.TEXT,
    hashtags: DataTypes.STRING,
    photo: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Food;
};
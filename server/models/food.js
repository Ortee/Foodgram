'use strict';

module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define('Food', {
    uuid: DataTypes.STRING,
    description: DataTypes.TEXT,
    hashtags: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Restaurant, { foreignKey: "restaurant_id" })
      }
    }
  });

  return Food;
};

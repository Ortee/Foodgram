'use strict';

var bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  var Restaurant = sequelize.define('Restaurant', {
    rest_name: DataTypes.STRING,
    address: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.BOOLEAN,
    description: DataTypes.TEXT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Food, {foreignKey: "restaurant_id"})
      }
    },

    // hooks: {
    //   beforeCreate: function (user, options, next) {
    //     // bcrypt.genSalt(10, function (err, salt) {
    //     //   bcrypt.hash(user.password, salt, function (err, hash) {
    //     //     user.password = hash;
    //     //     next(null, user);
    //     //   });
    //     // });
    //   },
    // },

    instanceMethods: {
      validPassword: function (password) {
        // return bcrypt.compareSync(password, this.password);
        if (password == this.password) {
          return true;
        } else {
          return false;
        }
      }
    },


    freezeTableName: true,
    timestamps: false
  });
  return Restaurant;
};

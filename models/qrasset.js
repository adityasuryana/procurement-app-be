'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Qrasset extends Model {
    static associate(models) {
      // define association here
    }
  }
  Qrasset.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Qrasset',
    hooks: {
      beforeValidate: (asset) => {
        const crypto = require('crypto');
        if (!asset.token) {
          const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let token = '';
          for (let i = 0; i < 8; i++) {
            token += chars[crypto.randomInt(0, chars.length)];
          }
          asset.token = token;
        }
      }
    }
  });
  return Qrasset;
};

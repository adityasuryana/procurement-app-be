'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    static associate(models) {
      Applicant.belongsTo(models.JobVacancy, {
        foreignKey: 'vacancyId',
        as: 'vacancy'
      });
    }
  }
  Applicant.init({
    vacancyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Review'
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Applicant',
    tableName: 'Applicants'
  });
  return Applicant;
};

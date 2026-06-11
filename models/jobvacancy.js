'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobVacancy extends Model {
    static associate(models) {
      JobVacancy.hasMany(models.Applicant, {
        foreignKey: 'vacancyId',
        as: 'applicants',
        onDelete: 'CASCADE'
      });
    }
  }
  JobVacancy.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Draft'
    },
    deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'JobVacancy',
    tableName: 'JobVacancies'
  });
  return JobVacancy;
};

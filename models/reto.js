'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reto.init({
    owner: DataTypes.STRING,
    typeUnit: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    snDea: DataTypes.STRING,
    unitFrom: DataTypes.STRING,
    regional: DataTypes.STRING,
    site: DataTypes.STRING,
    position: DataTypes.STRING,
    customer: DataTypes.STRING,
    status: DataTypes.STRING,
    rentSell: DataTypes.STRING,
    hargaJual: DataTypes.DECIMAL(15, 2),
    hargaBeli: DataTypes.DECIMAL(15, 2),
    hargaSewa: DataTypes.DECIMAL(15, 2),
    hargaCorrective: DataTypes.DECIMAL(15, 2),
    history: DataTypes.TEXT,
    tanggal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reto',
    tableName: 'Retos'
  });
  return Reto;
};

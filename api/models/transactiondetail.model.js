'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Transaction)
      TransactionDetail.belongsTo(models.Product)
    }
  }
  TransactionDetail.init({
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    product_description: DataTypes.TEXT,
    product_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE'});
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots'
      },
      onDelete: 'CASCADE'
    },
    url: {
      type: DataTypes.STRING
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
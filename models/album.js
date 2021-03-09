const { DataTypes, Model } = require("sequelize");

const sequelize = require("../lib/sequelize");

class Album extends Model {}

Album.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Album",
    timestamps: false,
  }
);

Album.sync();

module.exports = Album;

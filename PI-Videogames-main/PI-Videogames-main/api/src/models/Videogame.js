const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromDBorAPI: {
      type: DataTypes.ENUM("DataBase", "API"),
      defaultValue: "DataBase",
    }
  });
};

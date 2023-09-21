const { DataTypes } = require("sequelize");
const sequelize = require("../DB/config");

const Articulos = sequelize.define('articulos',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        sku: {
            type: DataTypes.DECIMAL(6),
            allowNull: false
        },
        articulo: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        modelo: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        fecha_alta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        stock: {
            type: DataTypes.DECIMAL(9),
            allowNull: false
        },
        cantidad: {
            type: DataTypes.DECIMAL(9),
            allowNull: false
        },
        descontinuado: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        fecha_baja: {
            type: DataTypes.DATE,
            allowNull: false
        },
        familia_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

module.exports = Articulos;

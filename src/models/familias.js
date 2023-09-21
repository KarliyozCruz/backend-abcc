const { DataTypes } = require("sequelize");
const sequelize = require("../DB/config");
const Articulos = require("./articulos");

const Familias = sequelize.define('familias',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        numero_familia: {
            type: DataTypes.DECIMAL(3),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        clase_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

Familias.hasMany(Articulos, {
    foreignKey: 'familia_id'
});

Articulos.belongsTo(Familias, { foreignKey: 'familia_id' });

module.exports = Familias;
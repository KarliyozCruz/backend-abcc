const { DataTypes } = require("sequelize");
const sequelize = require("../DB/config");
const Departamentos = require("./departamentos");
const Familias = require("./familias");

const Clases = sequelize.define('clases',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        numero_clase: {
            type: DataTypes.DECIMAL(2),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        departamento_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    }
);

Clases.hasMany(Familias,{
    foreignKey: 'clase_id'
});
Familias.belongsTo(Clases, { foreignKey: 'clase_id' });

module.exports = Clases;
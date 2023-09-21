const { DataTypes } = require("sequelize");
const sequelize = require("../DB/config");
const Clases = require("./clases");

const Departamentos = sequelize.define('departamentos',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        numero_departamento: {
            type: DataTypes.DECIMAL(1),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },{
        timestamps: false
    }
);

Departamentos.hasMany(Clases, {
    foreignKey:'departamento_id'
});
Clases.belongsTo(Departamentos, { foreignKey: 'departamento_id' });

module.exports = Departamentos;
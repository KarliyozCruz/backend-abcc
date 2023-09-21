const sequelize = require("../DB/config");
const { request, response } = require("express");
const { QueryTypes } = require("sequelize");
const dottie = require('dottie');

const getClases = async (req , res =  response) => {
    try{
        const clases = await sequelize.query('CALL getAllClasses();',{
            type:QueryTypes.RAW,
            nest: true
        }).then((data) => data.map( a => dottie.transform(a)));
        return res.json({
            ok: true,
            data: clases
        });
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const getClasesPorDepartamento = async (req = request , res =  response) => {
    try{
        const {departamentoId} = req.params;
        const clases = await sequelize.query('CALL getClassesByDepartment(:departamentoId);',{
            replacements: {
                departamentoId
            },
            type:QueryTypes.RAW,
            nest: true
        }).then((data) => data.map( a => dottie.transform(a)));
        if(clases.length > 0){
            return res.json({
                ok: true,
                data: clases
            });
        }else{
            return res.json({
                ok: false,
                data: clases
            });
        }
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const getClasePorId = async (req = request , res =  response) => {
    try{
        const {id} = req.params;
        const clase = await sequelize.query('CALL getClassById(:id);',{
            replacements: {
                id
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(clase){
            return res.json({
                ok: true,
                data: clase
            });
        }else{
            return res.json({
                ok: false,
                data: clase
            });
        }
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const postClases = async (req, res) => {
    try{
        const { numero_clase, nombre, departamento_id } = req.body;
        const claseDb = await sequelize.query('CALL getClassByClassNumber(:numero_clase);',{
            replacements: {
                numero_clase
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(claseDb){
            return res.json({
                ok:false,
                error: 'El numero de clase ya existe'
            });
        }
        await sequelize.query(`CALL postClass(:numero_clase, :nombre, :departamento_id);`,{
            replacements: {
                numero_clase, 
                nombre, 
                departamento_id
            },
            type:QueryTypes.RAW,
            nest: true
        });
        return res.json({
            ok: true
        });
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
}

const putClases = async (req = request, res = response) => {
    try {
        const { numero_clase, nombre, departamento_id } = req.body;
        const {id} = req.params;
        const claseDb = await sequelize.query('CALL getClassByClassNumber(:numero_clase);',{
            replacements: {
                numero_clase
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(claseDb && claseDb.id != id){
            return res.json({
                ok:false,
                error: 'El numero de clase ya existe'
            });
        }
        await sequelize.query(`CALL putClass(:id, :numero_clase, :nombre,  departamento_id);`,{
            replacements: {
                id, 
                numero_clase, 
                nombre, 
                departamento_id
            },
            type:QueryTypes.RAW,
            nest: true
        });
        return res.json({
            ok: true,
        });
        
    } catch (error) {
        return res.json({
            ok: false,
            error
        });
    }
}

const deleteClases = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        await sequelize.query(`CALL deleteClass(:id);`, {
            replacements: {
                id
            },
            type: QueryTypes.RAW,
            nest: true
        });
        return res.json({
            ok: true
        });
    } catch (error) {
        return res.json({
            ok :false,
            error
        });
    }
}

module.exports = {
    getClases,
    getClasesPorDepartamento,
    getClasePorId,
    postClases,
    putClases,
    deleteClases
}
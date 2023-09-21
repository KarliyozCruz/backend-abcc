const sequelize = require("../DB/config");
const { request, response } = require("express");
const { QueryTypes } = require("sequelize");
const dottie = require('dottie');

const getDepartamentos = async (req , res =  response) => {
    try{
        const departamentos = await sequelize.query('CALL getAllDepartments();',{
            type:QueryTypes.RAW,
            nest: true
        }).then((data) => data.map( a => dottie.transform(a)));
        return res.json({
            ok: true,
            data: departamentos
        });
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const getDepartamentoPorId = async (req = request , res =  response) => {
    try{
        const {id} = req.params;
        const departamento = await sequelize.query('CALL getDepartmentById(:id);',{
            replacements: {
                id
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(departamento){
            return res.json({
                ok: true,
                data: departamento
            });
        }else{
            return res.json({
                ok: false,
                data: departamento
            });
        }
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const postDepartamentos = async (req, res) => {
    try{
        const { numero_departamento, nombre } = req.body;
        const departamentoDb = await sequelize.query('CALL getDepartmentByDepartmentNumber(:numero_departamento);',{
            replacements: {
                numero_departamento
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(departamentoDb){
            return res.json({
                ok:false,
                error: 'El numero de departamento ya existe'
            });
        }
        await sequelize.query(`CALL postDepartment(:numero_departamento, :nombre);`,{
            replacements: {
                numero_departamento, 
                nombre
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

const putDepartamentos = async (req = request, res = response) => {
    try {
        const { numero_departamento, nombre } = req.body;
        const {id} = req.params;
        const departamentoDb = await sequelize.query('CALL getDepartmentByDepartmentNumber(:numero_departamento);',{
            replacements: {
                numero_departamento
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(departamentoDb && departamentoDb.id != id){
            return res.json({
                ok:false,
                error: 'El numero de departamento ya existe'
            });
        }
        await sequelize.query(`CALL putDepartment(:id, :numero_departamento, :nombre);`,{
            replacements: {
                id, 
                numero_departamento, 
                nombre
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

const deleteDepartamentos = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        await sequelize.query(`CALL deleteDepartment(:id);`, {
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
    getDepartamentos,
    getDepartamentoPorId,
    postDepartamentos,
    putDepartamentos,
    deleteDepartamentos
}
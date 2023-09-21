const sequelize = require("../DB/config");
const { request, response } = require("express");
const { QueryTypes } = require("sequelize");
const dottie = require('dottie');

const getFamilias = async (req , res =  response) => {
    try{
        const familias = await sequelize.query('CALL getAllFamilies();',{
            type:QueryTypes.RAW,
            nest: true
        }).then((data) => data.map( a => dottie.transform(a)));
        return res.json({
            ok: true,
            data: familias
        });
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const getFamiliasPorClase = async (req = request , res =  response) => {
    try{
        const {claseId} = req.params;
        const familias = await sequelize.query('CALL getFamiliesByClass(:claseId);',{
            replacements: {
                claseId
            },
            type:QueryTypes.RAW,
            nest: true
        }).then((data) => data.map( a => dottie.transform(a)));
        if(familias.length > 0){
            return res.json({
                ok: true,
                data: familias
            });
        }else{
            return res.json({
                ok: false,
                data: familias
            });
        }
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const getFamiliaPorId = async (req = request , res =  response) => {
    try{
        const {id} = req.params;
        const familia = await sequelize.query('CALL getFamilyById(:id);',{
            replacements: {
                id
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(familia){
            return res.json({
                ok: true,
                data: familia
            });
        }else{
            return res.json({
                ok: false,
                data: familia
            });
        }
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const postFamilias = async (req, res) => {
    try{
        const { numero_familia, nombre, clase_id } = req.body;
        const familiaDb = await sequelize.query('CALL getFamilyByFamilyNumber(:numero_familia);',{
            replacements: {
                numero_familia
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(familiaDb){
            return res.json({
                ok:false,
                error: 'El numero de familia ya existe'
            });
        }
        await sequelize.query(`CALL postFamily(:numero_familia, :nombre, :clase_id);`,{
            replacements: {
                numero_familia, 
                nombre, 
                clase_id
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

const putFamilias = async (req = request, res = response) => {
    try {
        const { numero_familia, nombre, clase_id } = req.body;
        const {id} = req.params;
        const familiaDb = await sequelize.query('CALL getFamilyByFamilyNumber(:numero_familia);',{
            replacements: {
                numero_familia
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(familiaDb && familiaDb.id != id){
            return res.json({
                ok:false,
                error: 'El numero de familia ya existe'
            });
        }
        await sequelize.query(`CALL putFamily(:id, :numero_familia, :nombre, :clase_id);`,{
            replacements: {
                id, 
                numero_familia, 
                nombre, 
                clase_id
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

const deleteFamilias = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        await sequelize.query(`CALL deleteFamily(:id);`, {
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
    getFamilias,
    getFamiliasPorClase,
    getFamiliaPorId,
    postFamilias,
    putFamilias,
    deleteFamilias
}
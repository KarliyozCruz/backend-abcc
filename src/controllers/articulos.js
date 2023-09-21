const sequelize = require("../DB/config");
const { request, response } = require("express");
const { QueryTypes } = require("sequelize");
const dottie = require('dottie');

const getArticulos = async (req , res =  response) => {
    try{
        const articulos = await sequelize.query('CALL getAllArticles();',{
            type:QueryTypes.RAW,
            nest: true
        }).then((data) => data.map( a => dottie.transform(a)));
        return res.json({
            ok: true,
            data: articulos
        });
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const getArticuloPorSku = async (req = request , res =  response) => {
    try{
        const {sku} = req.params;
        const articulo = await sequelize.query('CALL getArticleBySku(:sku);',{
            replacements: {
                sku
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(articulo){
            return res.json({
                ok: true,
                data: articulo
            });
        }else{
            return res.json({
                ok: false,
                data: articulo
            });
        }
    }catch(error){
        return res.json({
            ok: false,
            error
        });
    }
};

const postArticulos = async (req, res) => {
    try{
        const { sku, articulo, marca, 
                modelo, fecha_alta, 
                stock, cantidad, descontinuado, 
                fecha_baja, familia_id } = req.body;
        const articuloDb = await sequelize.query('CALL getArticleBySku(:sku);',{
            replacements: {
                sku
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(articuloDb){
            return res.json({
                ok:false,
                error: 'El sku ya existe'
            });
        }
        await sequelize.query(`CALL postArticle( :sku, :articulo, :marca, 
            :modelo, :fecha_alta, :stock, :cantidad, :descontinuado, :fecha_baja, :familia_id);`,{
            replacements: {
                sku, articulo, marca, 
                modelo, fecha_alta, 
                stock, cantidad, descontinuado, 
                fecha_baja, familia_id
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

const putArticulos = async (req = request, res = response) => {
    try {
        const { sku, articulo, marca, 
            modelo, fecha_alta, 
            stock, cantidad, descontinuado, 
            fecha_baja, familia_id } = req.body;
        const {id} = req.params;
        const articuloDb = await sequelize.query('CALL getArticleBySku(:sku);',{
            replacements: {
                sku
            },
            type:QueryTypes.RAW,
            nest: true
        }).spread((data) => data ? dottie.transform(data) : null);
        if(articuloDb && articuloDb.id != id){
            return res.json({
                ok:false,
                error: 'El sku ya existe'
            });
        }
        await sequelize.query(`CALL putArticle(:id, :sku, :articulo, :marca, 
            :modelo, :fecha_alta, :stock, :cantidad, :descontinuado, :fecha_baja, :familia_id);`,{
            replacements: {
                id, sku, articulo, marca, 
                modelo, fecha_alta, 
                stock, cantidad, descontinuado, 
                fecha_baja, familia_id
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

const deleteArticulos = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        await sequelize.query(`CALL deleteArticle(:id);`, {
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
    getArticulos,
    getArticuloPorSku,
    postArticulos,
    putArticulos,
    deleteArticulos
}
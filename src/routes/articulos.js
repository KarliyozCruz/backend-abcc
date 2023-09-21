const {Router} = require('express');
const { getArticulos,
        getArticuloPorSku,
        postArticulos, 
        putArticulos, 
        deleteArticulos } = require('../controllers/articulos');

const router = Router();

router.get('/' , getArticulos);

router.get('/:sku' , getArticuloPorSku);

router.post('/', postArticulos);

router.put('/:id', putArticulos);

router.delete('/:id', deleteArticulos);

module.exports = router;
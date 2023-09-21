const {Router} = require('express');
const { getFamilias,
        getFamiliasPorClase,
        postFamilias, 
        putFamilias, 
        deleteFamilias, 
        getFamiliaPorId} = require('../controllers/familias');

const router = Router();

router.get('/' , getFamilias);

router.get('/clase/:claseId' , getFamiliasPorClase);

router.get('/:id' , getFamiliaPorId);

router.post('/', postFamilias);

router.put('/:id', putFamilias);

router.delete('/:id', deleteFamilias);

module.exports = router;
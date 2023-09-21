const {Router} = require('express');
const { getDepartamentos,
        postDepartamentos, 
        putDepartamentos, 
        deleteDepartamentos, 
        getDepartamentoPorId} = require('../controllers/departamentos');

const router = Router();

router.get('/' , getDepartamentos);

router.get('/:id' , getDepartamentoPorId);

router.post('/', postDepartamentos);

router.put('/:id', putDepartamentos);

router.delete('/:id', deleteDepartamentos);

module.exports = router;
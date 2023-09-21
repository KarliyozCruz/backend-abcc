const {Router} = require('express');
const { getClases,
        getClasesPorDepartamento,
        postClases, 
        putClases, 
        deleteClases, 
        getClasePorId} = require('../controllers/clases');

const router = Router();

router.get('/' , getClases);

router.get('/departamento/:departamentoId' , getClasesPorDepartamento);

router.get('/:id' , getClasePorId);

router.post('/', postClases);

router.put('/:id', putClases);

router.delete('/:id', deleteClases);

module.exports = router;
const express = require('express');
const cors = require('cors');
const {PORT} = require('./const/const');
const sequelize = require('./DB/config');

const app = express();
const path = __dirname + '/view/';

sequelize.authenticate().then(() => {
    app.use(cors());
    app.use(express.json());
    app.use('/api/articulos', require('./routes/articulos'));
    app.use('/api/familias', require('./routes/familias'));
    app.use('/api/clases', require('./routes/clases'));
    app.use('/api/departamentos', require('./routes/departamentos'));
    app.use(express.static(path));
    app.get('/', (req, res) => {
        res.sendFile(path + 'index.html');
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch( error => {
    console.log(error);
})

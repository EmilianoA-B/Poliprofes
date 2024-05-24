//Definimos que usaremos express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const indexRoutes = require('./routes/index');
const apiRoutes = require('./routes/api');
const endpointRoutes = require('./routes/endpoint');

//Configuraciones
app.set('port', process.env.PORT || 3000);

//Seccion de middleware
//Sirve para que cuando se haga una solicitud al servidor
//este muestre la ruta que se solicita y el metodo que se utilza
app.use((req, res, next)=>{
    console.log(`${req.url} -${req.method}`);
    next();
})

//Para que el servidor entienda lo que envia del navegador
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/endpoint', endpointRoutes);

//Static files, definimos la ruta publica de nuestra pagina
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});
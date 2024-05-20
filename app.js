//Definimos que usaremos express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes/index');

//Configuraciones
app.set('port', process.env.PORT || 3000);
//Solo definimos que aqui estan las views, podria ser que no lo usemos
//Porque serian documentos de tipo ejs
app.set('views', path.join(__dirname, 'views'));
//igual, podria ser que no usemos el motor de plantillas
app.set('view engine', 'ejs');

//Seccion de middleware

//Sirve para que cuando se haga una solicitud al servidor
//este muestre la ruta que se solicita y el metodo que se utilza
app.use((req, res, next)=>{
    console.log(`${req.url} -${req.method}`);
    next();
})
//Para que el servidor entienda lo que recibe del navegador
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use(routes);
//Configuracion para que la raiz sirva el archivo inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
  });

//Static files, o sea, el front
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})
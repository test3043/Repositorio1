//Importar módulo express para crear el servidor web
const express = require('express');

//Crear una instancia de la aplicación express
const app = express();

//Definir el puerto en el que el servidor va a escuchar
const PORT = 3000;

//Middleware para interpretar los cuerpos de las solicitudes HTTP en formato JSON
app.use(express.json());

//Arreglo que servirá como base de datos temporal
let todos = [
    {id:1, tarea: 'Despertar'},
    {id:2, tarea: 'Comer'},
    {id:3, tarea: 'Lavar'},
    {id:4, tarea: 'Desplazarse'},
    {id:5, tarea: 'Leer'}
];


//GET
//Se establece una ruta GET en '/todos' para obtener las tareas
app.get('/todos', (req,res) =>{
    //Responde con el arreglo 'todos' en formato JSON
    res.json(todos);
});

//GET por id
//Se utiliza el parámetro dinámico :id
app.get('/todos/:id', (req,res) => {
    //Convierte el parámetro de la ruta a un número entero
    const id = parseInt(req.params.id);
    //Busca la tarea en el arreglo de acuerdo con el id
    const todo = todos.find(e => e.id === id);
    //*
    //Si la tarea es encontrada se muestra la información
    if(todo){
        res.json(todo);
    }else{
        //Si no se encuentra se responde con un código 404 (No encontrado)
        res.status(404).send('La tarea no existe.');
    }

});

//Iniciar en el puerto especificado
app.listen(PORT,() => {
    //Mostrar mensaje en consola
    console.log('Ejecutando en http://localhost:', PORT);
});

//POST
//Ruta POST para agregar una nueva tarea
app.post('/todos',(req,res) => {
    //Crea un nuevo objeto con un nuevo id y el nombre de la tarea recibido en la solicitud
    const nuevaTarea = {
        id:todos.length + 1,     //El nuevo id será el tamaño del arreglo + 1
        tarea: req.body.tarea
    }
    //Agrega la nueva tarea al arreglo
    todos.push(nuevaTarea);
    //Responde con la información de la nueva tarea y el estado 201 (Creado)
    res.status(201).json(nuevaTarea);
});

//PUT
//Ruta PUT para actualizar el nombre de la tarea según el id
app.put('/todos/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const todo = todos.find(e => e.id === id);

    //Si la tarea existe se actualiza su nombre de acuerdo al cuerpo de la solicitud
    if(todo){
        todo.tarea = req.body.tarea;
        res.json(todo);
    }else{
        res.status(404).send('La tarea no existe.');
    }
});

//DELETE
//Ruta para eliminar la tarea de acuerdo con el id
app.delete('/todos/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    //Encuentra el índice de la tarea a borrar en el arreglo
    const indice = todos.findIndex (e => e.id === id);

    if(indice != -1){
        //Elimina la tarea del arreglo usando splice
        todos.splice(indice,1);
        //Responde confirmando que la tarea fue eliminada
        res.send('La tarea fue eliminada.');
    }else{
        res.status(404).send('Tarea no encontrada.');
    }

});
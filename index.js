//https://stackoverflow.com/questions/9177049/express-js-req-body-undefined

var express = require("express");
var bodyParser = require('body-parser')
var cont=1;
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

var tasks = []

app.get("/", (req, res, next) => {
    res.json("{ 'message': 'Tasks server online'}");
});

app.get("/tasks/:id", (req, res, next) => {
    const id = req.params.id
    const arra = tasks.find(ele => ele.id == id);
    res.status(200).json({
        message: "Obtener por id",
        object: arra
    });
});
app.post("/tasks", jsonParser, (req, res, next) => {
    req.body.id = tasks.length + 1;
    req.body.status = "pendiente";
    tasks.push(req.body);
    res.status(200).send({
        message: 'Ok'});
    
});

app.get("/tasks", (req, res, next) => {
    res.json(tasks);
});

app.delete("/tasks/:id", (req, res, next) => {
    const id = req.params.id
    const gs = tasks.findIndex(ele => ele.id == id);
    tasks.splice(gs, 1);
    res.status(200).json({
        message: "Eliminado"
    });
});



///Completar/Pendiente tarea

app.put("/tasks/:id", jsonParser, (req, res, next) => {
    var state = req.query.status;
    var id = req.params.id
    
    
    if(state==="pendiente"){
        const s = tasks.findIndex(o => o.id == id);
        tasks[s].status = state
        res.status(200).json({
            message: "Completado OK",
            object: tasks[s]
        });
    }if(state==="completado"){
        const s = tasks.findIndex(o => o.id == id);
        tasks[s].status = state
        res.status(200).json({
            message: "Pendiente OK",
            object: tasks[s]
        });
    }
        
                
   
    res.json(tasks);
});




app.listen(3000, () => {
    console.log("Servidor HTTP funcionando");
});
const express =  require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const actions = require('./services/actions')
const app = express();
const handleMessage = require('./services/handleMessages');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('port', process.env.PORT);

app.listen(app.get('port'), ()=>{
    console.log(`Servidor iniciado en el puerto ${process.env.PORT}` );
})

app.post('/webhook',(req,res)=>{
    const body = req.body;
    if(body.object === 'page'){
        res.status(200).send("EVENT_RECEIVED");
        body.entry.forEach(function(entry){
            let webHookEvent = entry.messaging[0];
            console.log(webHookEvent);
            //Enviamos el mensaje y el evento
            handleMessage.handleMessages(webHookEvent);
        })
    }else{
        res.sendStatus(404);
    }
})

app.get('/webhook',(req,res)=>{
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token'];
    if(mode&&token){
        if(mode==='subscribe' && token===process.env.VERIFYTOKEN){
            console.log("Webhook listo");
            res.status(200).send(challenge)
        }else{
            res.status(403);
        }
    }
})

app.get('/', (req,res)=>{
    res.send('Holaaaaa');
})
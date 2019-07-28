/*Solo se revisa si solo es del tiempo de entrega */
const actions = require("./actions");

exports.handleMessages = (webhookEvent) =>{
    if(webhookEvent.message){
        let message = webhookEvent.message;
        //ese elemento contiene una respuesta de un boton realizado
        if(message.quick_reply){
            handleWithReplies(webhookEvent);
        }
        else if(message.attachments){
            actions.stores(webhookEvent);
        }
        else if(message.text){
            handleNLP(webhookEvent)
        }
    }
    if(webhookEvent.postback){
        handlePostback(webhookEvent);
    }
}

handlePostback = (webhookEvent) =>{
    let evento = webhookEvent.postback.payload;
    switch(evento){
        case 'encuesta':
            actions.quickReplies(webhookEvent)
        break;
        case 'sucursales':
            actions.webView(webhookEvent);
            //handleLocation(webhookEvent);
        break;
        case 'inicio':
            actions.sendTextMessage("Bienvenido al chatbot", webhookEvent)
        break;
    }
}


handleWithReplies = (webhookEvent) =>{
    let reply = webhookEvent.message.quick_reply.payload;
    //Template de las respuestas para contestas
    const response ={
        texto: "Nos recomendarìas?",
        replies:[
            {
                content_type:"text",
                title:"Si",
                payload:'siRecomienda'
            },
            {
                content_type:"text",
                title:"No",
                payload:'noRecomienda'
            }
        ]
    }
    //Si es cualquiera de nuestros botones
    if(reply=="rapidez" || reply=="ubicacion" || reply=="servicio"){
        actions.quickReplies(webhookEvent,response);
    }else{
        actions.sendTextMessage("Gracias por ayudarnos a mejorar", webhookEvent)
    }
}

handleLocation =(webhookEvent)=>{
    const replyLocation ={
        texto:"Por favor comparte tu ubicacion",
        replies:[
            {
                content_type:"location" //ya tiene configuracion previa 
            }
        ]
    }
    actions.quickReplies(webhookEvent,replyLocation)
}

//PARA INTELOGENCIA ARTIFICIAL

handleNLP = (webhookEvent) =>{
    let nlp = webhookEvent.message.nlp
    //verifica si hay una entidad entrenada
    if(nlp.entities.mensaje){
        //si es relacionado a entrega, ya sea que tenga pauqete, tiempo,etc, segun se haya entrenado
        if(nlp.entities.mensaje[0].value=="tiempo_entrega"){
            actions.sendTextMessage("Nuestro tiempo de entrega es de 5 dias hàbiles", webhookEvent)
        }
    }else{
            actions.sendTextMessage("No te entiendo, pero puedo ayudarte a encontrar sucursales", webhookEvent)
    }
}
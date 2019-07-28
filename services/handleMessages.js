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
            actions.sendTextMessage("Has enviado texto",webhookEvent);
            console.log('Envio un texto');
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
            handleLocation(webhookEvent);
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
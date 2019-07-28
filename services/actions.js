const sendAPI = require('./graphAPI');

const repliesSurvey = {
    texto: 'Por favor llena la encuesta y dinos que es lo que mas te gusta de nuestro servicio',
    replies: [
        {
            content_type:"text",
            title:'Servicios',
            payload:'servicio'
        },
        {
            content_type:"text",
            title:'Rapidez',
            payload:'rapidez'
        },
        {
            content_type:"text",
            title:'Ubicacion',
            payload:'ubicacion'
        },
    ]
}
exports.quickReplies =(webhookEvent,replies) =>{
    if(!replies){
        replies=repliesSurvey;
    }
    let response = {
        recipient:{
            id: webhookEvent.sender.id
        },
        message:{
            text: replies.texto,
            quick_replies: replies.replies
        }
    }
    sendAPI.callSendAPI(response);
}

//le tenemos que mandar el texto y el evento
exports.sendTextMessage = (texto, webhookEvent)=>{
    let response ={
        recipient:{
            id: webhookEvent.sender.id, //usuario que me envio el evento, nos lo da el webhook
        },
        message:{
            text: texto //texto que queremos mandar
        }
    }
    sendAPI.getProfile(response.recipient.id);
    sendAPI.callSendAPI(response);
}

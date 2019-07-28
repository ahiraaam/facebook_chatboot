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

exports.stores =(webhookEvent) =>{
    let response = {
        recipient:{
            id: webhookEvent.sender.id
        },
        message:{
            attachment:{
                type:"template",
                payload:{
                    template_type:"generic",
                    elements:[
                        {
                            title:"Tienda del centro",
                            image_url:"https://ntcd.mx/uploads/2017/05/11/nota-tecnologia-necesario-preservar-el-centro-historico-de-la-ciudad-de-mexico-especialista201711549.jpg",
                            subtitle:"Tienda en el centro",
                            default_action:{
                                type:"web_url",
                                url:"https://www.google.com/maps/place/Z%C3%B3calo/@19.4330818,-99.1317907,16.68z/data=!4m13!1m7!3m6!1s0x85d1f92d2e0e4dbd:0x905574a740c4893d!2sCentro+Hist%C3%B3rico+de+la+Cdad.+de+M%C3%A9xico,+Centro,+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.4357068!4d-99.131757!3m4!1s0x85d1fecd4864aaff:0x4cff0c5cb291360c!8m2!3d19.4326017!4d-99.1332047",
                                messenger_extensions:"FALSE",
                                webview_height_ratio:"COMPACT",
                            },
                            buttons:[
                                {
                                    type:"web_url",
                                    url:"https://www.google.com/maps/place/Z%C3%B3calo/@19.4330818,-99.1317907,16.68z/data=!4m13!1m7!3m6!1s0x85d1f92d2e0e4dbd:0x905574a740c4893d!2sCentro+Hist%C3%B3rico+de+la+Cdad.+de+M%C3%A9xico,+Centro,+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.4357068!4d-99.131757!3m4!1s0x85d1fecd4864aaff:0x4cff0c5cb291360c!8m2!3d19.4326017!4d-99.1332047",
                                    title:"Mostrar el mapa"
                                },
                                {
                                    type:"phone_number",
                                    title:"Llamar a la tienda",
                                    payload:"+5211223344",
                                }
                            ]
                        },
                        {
                            title:"Tienda 2",
                            image_url:"https://ntcd.mx/uploads/2017/05/11/nota-tecnologia-necesario-preservar-el-centro-historico-de-la-ciudad-de-mexico-especialista201711549.jpg",
                            subtitle:"Tienda en el centro",
                            default_action:{
                                type:"web_url",
                                url:"https://www.google.com/maps/place/Z%C3%B3calo/@19.4330818,-99.1317907,16.68z/data=!4m13!1m7!3m6!1s0x85d1f92d2e0e4dbd:0x905574a740c4893d!2sCentro+Hist%C3%B3rico+de+la+Cdad.+de+M%C3%A9xico,+Centro,+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.4357068!4d-99.131757!3m4!1s0x85d1fecd4864aaff:0x4cff0c5cb291360c!8m2!3d19.4326017!4d-99.1332047",
                                messenger_extensions:"FALSE",
                                webview_height_ratio:"COMPACT",
                            },
                            buttons:[
                                {
                                    type:"web_url",
                                    url:"https://www.google.com/maps/place/Z%C3%B3calo/@19.4330818,-99.1317907,16.68z/data=!4m13!1m7!3m6!1s0x85d1f92d2e0e4dbd:0x905574a740c4893d!2sCentro+Hist%C3%B3rico+de+la+Cdad.+de+M%C3%A9xico,+Centro,+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.4357068!4d-99.131757!3m4!1s0x85d1fecd4864aaff:0x4cff0c5cb291360c!8m2!3d19.4326017!4d-99.1332047",
                                    title:"Mostrar el mapa"
                                },
                                {
                                    type:"phone_number",
                                    title:"Llamar a la tienda",
                                    payload:"+5211223344",
                                }
                            ]
                        }
                    ]
                }
            }
        }
    }
    sendAPI.callSendAPI(response);
}
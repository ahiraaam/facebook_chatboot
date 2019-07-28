require('dotenv').config(); //obtener info de la variables de entorno
const request = require('request');

//enviamos informacion del mensaje
//PETICION A LA API
exports.callSendAPI = (requestBody)=>{
    const url = 'https://graph.facebook.com/v3.3/me/messages';
    request({
        uri: url,
        qs:{
            access_token: process.env.ACCESS_TOKEN,
        },
        method: "POST",
        json: requestBody, //parametro que enviamos, el mensaje en JSON
    },(error, body)=>{
        if(!error){
            console.log('Peticion enviada', body); 
        }else{
            console.log('Error en peticion',error);
        }
    })
}

//enviamos identificador de usuario que nos manda el webhook
exports.getProfile = (senderID) =>{
    const url = `https://graph.facebook.com/v3.3/${senderID}`;
    request(
        {
            uri: url,
            qs:{
                access_token: process.env.ACCESS_TOKEN,
                fields: "first_name, last_name, gender, locale, timezone"//campos que fb nos permite obtener del usuario
            },
            method: "GET",
        },(error, _res, body)=>{
            if(!error){
                let response = JSON.parse(body);
                console.log(`Nombre ${response.first_name} Apellido: ${response.last_name}`)
            }
        }
    )
}

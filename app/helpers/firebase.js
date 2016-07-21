var config = require(__dirname + "/../config"),
    firebase = require('firebase'),

firebase.initializeApp({
    serviceAccount:{
        serviceId: config.firebase.id,
        clientEmail: config.firebase.clientEmail
    }
    databaseURL: config.firebase.url
})

var db = firebase.database()
console.log(db)

module.exports = db

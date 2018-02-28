const functions = require('firebase-functions');

const express = require("express")

var whitelist = ['http://localhost:4200', 'https://grabcikgu.firebaseapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS (' + origin + ')' ))
    }
  }
}

const cors = require('cors')(corsOptions);
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app1 = express()
app1.use(cors);

// app1.get("*", (request, response) => {
//   response.send("Hello from Express on Firebase!")
// })

app1.get("/send", (request,response) => {
  response.send("Hello world!")
})

app1.post("/sendMail", (request,response) => {
    // console.log(request.method);
    // console.log(request.get('Content-Type'));
    // console.log(request.get('Access-Control-Allow-Origin'));
    // console.log(request.body.to);
    // console.log(request.body);

    const msg = {
      to: request.body.to,
      from: request.body.from,
      subject: request.body.subject,
      text: request.body.content,
      html: request.body.htmlcontent ? request.body.htmlcontent : request.body.content
    };
    sgMail.send(msg);
    response.status(200).json("It's good");
})

const api = functions.https.onRequest(app1)


// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const updateTutorProfile = functions.database.ref('/tutors/{tutorID}/city')
  .onWrite( event => {
    // const originalCity  = event.data.val();
    const previousCity = event.data.previous.val();

    let newTutorData = {};

    return admin.database().ref('/tutors/' + event.params.tutorID + '/subjects/').once('value')
      .then(function(subjects){
        for (let subject of subjects.val()){
          for (let x=0; x< subject.levels.length; x++) {
            newTutorData['/Location/'+ previousCity + '/' + subject.name + '/levels/' + x + '/' + event.params.tutorID] = null;
          }
          return admin.database().ref('/').update(newTutorData);
        }
      })
  });

  module.exports = {
    api,
    updateTutorProfile
  }

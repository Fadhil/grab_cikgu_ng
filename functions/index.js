const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateTutorProfile = functions.database.ref('/tutors/{tutorID}/city')
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

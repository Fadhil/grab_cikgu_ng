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
    const original  = event.data.val();
    const previous = event.data.previous.val();
    console.log('Uppercasing', event.params.tutorID, original);
    // const uppercase = original.toUpperCase();
    const uppercase = previous.toUpperCase();
    // return event.data.ref.parent.child('uppercase').set(uppercase);
    // return event.data.ref.parent.parent.parent.child('Location').child(previous).set(null);

    return admin.database().ref('/tutors/' + event.params.tutorID + '/subjects/').once('value')
      .then(function(snapshot){
        // console.log(snapshot.val());
        for (let subject of snapshot.val()){
          // console.log(subject.levels);
          for (let x=0; x< subject.levels.length; x++) {
            admin.database().ref('/Location/'+ previous + '/'+subject.name+'/levels/' + x + '/' + event.params.tutorID).set(null);
          }
        }

      })


  });

const functions = require('firebase-functions');
const sendgrid = require('sendgrid');
const client = sendgrid("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");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function parseBody(body) {
  var helper = sendgrid.mail;
  var fromEmail = new helper.Email(body.from);
  var toEmail = new helper.Email(body.to);
  var subject = body.subject;
  var content = new helper.Content('text/html', body.content);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  return  mail.toJSON();
}

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

  exports.httpEmail = functions.https.onRequest((req, res) => {
  return Promise.resolve()
    .then(() => {
      if (req.method !== 'POST') {
        const error = new Error('Only POST requests are accepted');
        error.code = 405;
        throw error;
      }


      const request = client.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: parseBody(req.body)
      });

      return client.API(request)


    })
    .then((response) => {
      if (response.body) {
        res.send(response.body);
      } else {
        res.end();
      }
    })

    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });


})

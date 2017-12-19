// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  firebase: {
      apiKey: "AIzaSyDjS3-Gyc47FMUzqfOCkk-oijh-xAf0FtI",
      authDomain: "grabcikgu.firebaseapp.com",
      databaseURL: "https://grabcikgu.firebaseio.com",
      projectId: "grabcikgu",
      storageBucket: "grabcikgu.appspot.com",
      messagingSenderId: "615514819115"
    }
};

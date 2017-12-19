require('./src/app/models/helpers.ts');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./e2e/**/*-spec.ts'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },
  onPrepare: () => {
    // import * as faker from 'faker';
    browser.waitForAngularEnabled(false);
     // let globals = require('protractor');
     // let browser = globals.browser;
     // browser.ignoreSynchronization = true;
     // browser.manage().window().maximize();
     // browser.manage().timeouts().implicitlyWait(5000);
     var Faker = require('faker');
     browser.params.randomName = Faker.name.findName();
     browser.params.randomEmail = Faker.internet.email();
   },
  onCleanUp: () => {
    CleanUpFireBaseUser();
  }
};

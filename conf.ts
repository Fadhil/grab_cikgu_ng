
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./e2e/**/*-spec.ts'],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ["--window-size=1920,1080"]
      //'args': ["--headless", "--disable-gpu", "--window-size=800,600"]
    }
  },
  suites: {
      tutor: './e2e/tutor/**/*-spec.ts',
      student: './e2e/student/**/*-spec.ts',
      search: ['./e2e/search/**/*-spec.ts'],
      admin: './e2e/admin/**/*-spec.ts'
  },
  onPrepare: () => {
    browser.waitForAngularEnabled(false);
     // let globals = require('protractor');
     // let browser = globals.browser;
     // browser.ignoreSynchronization = true;
     // browser.manage().window().maximize();
     // browser.manage().timeouts().implicitlyWait(5000);
     // const Faker = require('faker');
     // browser.params.randomName = Faker.name.findName();
     // browser.params.randomEmail = Faker.internet.email();
   },
  onCleanUp: () => {
    // I need to figure out how to clean up the firebase user database later
    // CleanUpFireBaseUser();
  }
};

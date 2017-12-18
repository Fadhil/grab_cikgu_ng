
describe('grabcikgu student registration page', function() {

  beforeAll(() => {
    const Faker = require('faker');
    browser.params.randomName = Faker.name.findName();
    browser.params.randomEmail = Faker.internet.email();
  });

  beforeEach(function() {

  });

  it('should allow a student to register successfully', function() {
    browser.get('http://localhost:4200/student/register');
    expect(element(by.id('register-form-link')).getText()).toContain('Register');
    element(by.id('name')).sendKeys(browser.params.randomName);
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('confirm-password')).sendKeys('12345678');

    element(by.id('register-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain("Successfully registered as a Student.");
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/student/login');
  });

  it('should not allow duplicate registration', function() {
    browser.get('http://localhost:4200/student/register');
    element(by.id('name')).sendKeys(browser.params.randomName);
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('confirm-password')).sendKeys('12345678');
    element(by.id('register-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain('The email address is already in use by another account.');
  });

  it('should allow a student to login successfully and display correct data profile', function() {
    browser.get('http://localhost:4200/student/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();

    const EC = protractor.ExpectedConditions;

    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/student/profile';
      });
    };

    const condition = EC.and(urlChanged,
                    EC.textToBePresentInElement($('.profile-username'), browser.params.randomName));

    browser.wait(condition, 5000);

    expect(element(by.id('ic_no')).getText()).toContain('780111-10-2332');

    const d = new Date();
    const n = d.getFullYear();
    const age = n - 1978;
    expect(element(by.id('age')).getText()).toContain(age);

    expect(element(by.id('city')).getText()).toContain('Cyberjaya');
    expect(element(by.id('state')).getText()).toContain('Selangor');
  });

  it('should not allow unauthorized access', function() {
    browser.get('http://localhost:4200/student/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('nopass');
    element(by.id('login-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain('Error: The password is invalid or the user does not have a password.');
  });

  it('should be allowed to edit successfully', function() {
    browser.get('http://localhost:4200/student/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();

    const EC = protractor.ExpectedConditions;

    let urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/student/profile';
      });
    };

    let condition = EC.and(urlChanged,
                    EC.textToBePresentInElement($('.profile-username'), browser.params.randomName));

    browser.wait(condition, 5000);

    // click on the button
    element(by.id('saveprofile')).click();

    urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/student/profile/edit';
      });
    };

    // expect page to display the right data

    const name_box = element(by.id('name'));

    checkInputValue = function () {
      return name_box.getAttribute('value').then(function (value) {
        return value === browser.params.randomName;
      });
    };

    condition = EC.and(urlChanged, checkInputValue);

    browser.wait(urlChanged, 5000);

    // change some data
    element(by.id('address')).sendKeys('Lot 8919, Jalan Kambing');

    // Register for the subjects
    element(by.id('bm')).element(by.css('.s1_3')).click();
    element(by.id('bm')).element(by.css('.s4_6')).click();

    // press save and expect to return successful alert
    element(by.id('saveprofile')).click();

    urlChanged2 = function() {
      return browser.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4200/student/profile';
      });
    };

    browser.wait(urlChanged2, 5000);

    expect(element(by.css('.alert')).getText()).toContain('Successfully');

    // Check for all the list of the subjects

  });

});

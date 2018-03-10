describe('TutorGo admin login page', function() {
  beforeAll( () => {
    const Faker = require('faker');
    browser.params.randomName = Faker.name.findName();
    browser.params.randomEmail = Faker.internet.email();
  });

  it('should allow an admin to login successfully', function() {
    browser.get('/admin/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();

    const EC = protractor.ExpectedConditions;

    var urlChanged = function(dom) {
      return browser.getCurrentUrl().then(function(url) {
        return url === browser.baseUrl + '/admin/bookings';
      });
    };
  });

  it('should logout successfully', function() {
    pending();
  });

  it('should not allow unauthorized access', function() {
    browser.get('/admin/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('nopass');
    element(by.id('login-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain('Error: The password is invalid or the user does not have a password.');
  });

});

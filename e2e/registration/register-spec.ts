describe('grabcikgu tutor registration page', function() {

  beforeEach(function() {
    browser.get('http://localhost:4200/tutor/register');
  });

  it('should allow a tutor to register successfully', function() {
    expect(element(by.id('register-form-link')).getText()).toContain('Register');
    element(by.id('name')).sendKeys(browser.params.randomName);
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('confirm-password')).sendKeys('12345678');
    element(by.id('register-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain("Successfully registered as a Tutor.");
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/tutor/login');
  });

  it('should not allow duplicate registration', function() {
    element(by.id('name')).sendKeys(browser.params.randomName);
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('confirm-password')).sendKeys('12345678');
    element(by.id('register-submit')).click();
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 5000);
    expect(element(by.css('.alert')).getText()).toContain("The email address is already in use by another account.");
  });
});

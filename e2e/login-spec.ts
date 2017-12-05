describe('grabcikgu login page', function() {

  beforeEach(function() {
    browser.get('http://localhost:4200/tutor/login');
  });

  it('should display login page', function() {
    expect(browser.getTitle()).toEqual('GrabCikgu - Beta');
  });

  it('should allow a tutor to login successfully', function() {
    element(by.id('email')).sendKeys('hazim@p2digital.com');
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/tutor/profile');
    expect(element(by.css('.profile-username')).getText()).toBe("Hazim");
  });

  it('should not allow unauthorized access', function() {
    element(by.id('email')).sendKeys('hazim@p2digital.com');
    element(by.id('password')).sendKeys('nopass');
    element(by.id('login-submit')).click();
    expect(element(by.css('.alert')).getText()).toContain("Failed to authenticate");
  });

})

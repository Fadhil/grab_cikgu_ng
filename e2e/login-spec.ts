describe('grabcikgu login page', function() {

  beforeEach(function() {
    browser.get('http://localhost:4200/tutor/login'); 
  });

  it('should display login page', function() {
    expect(browser.getTitle()).toEqual('GrabCikgu - Beta');
  });

  it('should allow a tutor to login successfully', function() {
    element(by.id('email')).sendKeys('test@p2.com');
    element(by.id('password')).sendKeys('password');
    element(by.id('login-submit')).click();
  });

  it('should not allow unauthorized access', function() {
    element(by.id('email')).sendKeys('test@p2.com');
    element(by.id('password')).sendKeys('password');
    element(by.id('login-submit')).click();
  });

})


var helper = require('../helper.ts');

describe('grabcikgu search for tutor', function(){
  beforeAll(() => {
    const Faker = require('faker');
    browser.params.randomName = Faker.name.findName();
    browser.params.randomEmail = Faker.internet.email();

    // Login to function account using

    // Create a list of tutors
  });

  beforeEach(() => {
    browser.get(browser.baseUrl + '/student/login');
    element(by.id('email')).sendKeys(browser.params.randomEmail);
    element(by.id('password')).sendKeys('12345678');
    element(by.id('login-submit')).click();
  });

  it('can list the number of tutors by area and subject', function(){

    browser.get(browser.baseUrl + '/student/people');
    expect(element(by.css('.content-header')).getText()).toContain('Search for Tutors');

    // Click on state & city
    element(by.id('state')).element(by.cssContainingText('option', 'Selangor')).click();
    element(by.id('city')).element(by.cssContainingText('option', 'Cyberjaya')).click();
    //
    // // Click on subject
    element(by.id('level')).element(by.cssContainingText('option', 'Standard (1-3)')).click();

    element(by.id('subject')).element(by.cssContainingText('option', 'Bahasa Malaysia')).click();
    //
    // // Click on rate
    element(by.id('rate')).element(by.cssContainingText('option', 'Premium')).click();

    element(by.id('searchButton')).click();

    // Expect list of tutors
    browser.wait(function() {
      return element(by.css('.alert')).isPresent();
    }, 10000);

    // expect(element(by.id('tutors')).getText()).toContain('Tutors');

  });

  it('can display a particular tutor to view his/her details', function(){

  });

  it('can book the tutor', function(){

  });

  it('can alert the tutor that someone booked him', function(){

  });

  it('can allow the tutor to accept the booking', function(){

  });

  it('alert the student that his booking was accepted', function(){

  });

});

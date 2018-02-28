describe('gotutor admin registration page', function() {
  beforeAll(() => {
    const Faker = require('faker');
    browser.params.randomName = Faker.name.findName();
    browser.params.randomEmail = Faker.internet.email();
  });

it('should allow an admin to register successfully', function() {
  // link must come from an e-mail invite
  // check to see if the email and code is valid

  browser.get('http://localhost:4200/admin/invite');
  expect(element(by.id('title')).getText()).toContain('Admin Registration');
})

});

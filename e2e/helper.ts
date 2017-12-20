var urlChanged = function (testUrl) {
  return browser.getCurrentUrl().then(function(url) {
    return url === testUrl;
  });
};

module.exports.urlChanged = urlChanged;

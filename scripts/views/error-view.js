'use strict';

var app = app || {};
var errorView = {};
// (function(module) {
errorView.initErrorPage = (err) => {
  $('.container').hide();
  $('.error-view').show();
  $('#error-message').empty();
  var template = Handlebars.compile($('#error-template').text());
  $('#error-message').append(template(this));
}



// module.errorView = errorView
// })(app);

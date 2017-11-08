'use strict';
var app = app || {};

//(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    Book.all.forEach(a => {$('main').append(a.toHtml()); console.log(a.toHtml()); });
  }

  // module.bookView = bookView;
//})(app);

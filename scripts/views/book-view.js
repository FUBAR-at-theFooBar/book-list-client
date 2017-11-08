'use strict';
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();

    app.Book.all.forEach(a => $('#book-main').append(a.toHtml()));
  }



  module.bookView = bookView;
})(app);

$(app.Book.fetchAll(app.bookView.initIndexPage))

'use strict';
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('#book-main').show();

    app.Book.all.forEach(a => $('#book-main').append(a.toHtml()));
  }

  bookView.initDetailPage = () => {
    console.log('initFormPage');
    $('.container').hide();
    $('#detail-main').show();
    $('#create-form').on('submit', function(event){
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.image_url.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value
      }


    })
  }

  bookView.initFormPage = () => {
    $('.container').hide();
    $('#form-main').show();
  }



  module.bookView = bookView;
})(app);

// $(app.Book.fetchAll(app.bookView.initIndexPage))

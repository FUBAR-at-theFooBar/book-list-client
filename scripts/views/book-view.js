'use strict';
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('#book-main section').remove();
    $('.container').hide();
    $('#book-main').show();
    app.Book.all.forEach(a => $('#book-main').append(a.toHtml()));
    // $('.book-main button').click(console.log($('.book-main button').data('fetchone'));
    $('.book-main').on('click', '#viewdetails',function(){
      console.log('click');
      console.log($(this).data('fetchone'));
      bookView.initDetailPage($(this).data('fetchone'));
    });
  }

  // $('#books').on('click', '.books', function() {

  bookView.initDetailPage = () => {
    $('.container').hide();
    $('#detail-main').show();




  }

  bookView.initFormPage = () => {
    console.log('form page show pls');
    $('.container').hide();
    $('#form-main').show();

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




  module.bookView = bookView;
})(app);

// $(app.Book.fetchAll(app.bookView.initIndexPage))

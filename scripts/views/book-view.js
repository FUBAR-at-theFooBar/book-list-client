'use strict';
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('#book-main section').remove();
    $('.container').hide();
    $('#book-main').show();
    app.Book.all.forEach(a => $('#book-main').append(a.toHtml()));
    $('.book-main').on('click', '#viewdetails',function(){
      bookView.initDetailPage($(this).data('fetchone'));
    });
  }

  bookView.initDetailPage = (fetchone) => {
    $('.container').hide();
    $('#detail-main').empty();
    $('#detail-main').show();
    // console.log(fetchone);
    $('#detail-main').append(app.Book.all[fetchone-1].detailToHtml());
    bookView.setTeasers();
  }

  bookView.setTeasers = () => {
    let description = $('#detail-main p').text();
    let teaser = $('#detail-main p').text().substr(0, 200) + '...';
    $('#detail-main p').text(teaser);

    $('#detail-main').on('click', '#readmore', function(e) {
      e.preventDefault();
      if ($('#detail-main p').text() === teaser) {
        $('#detail-main p').text(description);
        $(this).html('read less &larr;');
      } else {
        $(this).html('...read more');
        $('#detail-main p').text(teaser);
      }
    });
  };

  bookView.initFormPage = () => {
    $('.container').hide();
    $('#form-main').show();

    $('#addBook').on('submit', function(event){
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.imageurl.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value
      }

      app.Book.create(book);
    })
  }




  module.bookView = bookView;
})(app);

// $(app.Book.fetchAll(app.bookView.initIndexPage))

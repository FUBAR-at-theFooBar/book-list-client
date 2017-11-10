'use strict';
var app = app || {};

(function(module) {
  var bookView = {};

  bookView.initIndexPage = () => {
    $('#book-main section').remove();
    $('.container').hide();
    $('#book-main').show();
    app.Book.all.forEach(a => $('#book-main').append(a.toHtml()));
    $('.book-main').on('click', '#viewdetails',function() {
      bookView.initDetailPage($(this).data('fetchone'));
    });
  }

  bookView.initDetailPage = (fetchone) => {
    $('.container').hide();
    $('#detail-main').empty();
    $('#detail-main').show();
    // console.log(fetchone);
    let fetchIndex;
    app.Book.all.forEach((el, i)=> {
      if (fetchone === el.book_id){
        fetchIndex = i;
      }
    })
    $('#detail-main').append(app.Book.all[fetchIndex].detailToHtml());
    bookView.setTeasers();
    $('#update').on('click', function() {
      bookView.initUpdatePage(fetchone, fetchIndex);
    });
    $('#delete').on('click', function() {
      app.Book.delete(fetchone);
    });

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

  bookView.initUpdatePage = (fetchone, fetchIndex) => {
    $('.container').hide();

    $('#updateBook #title').attr('placeholder', app.Book.all[fetchIndex].title);
    $('#updateBook #author').attr('placeholder', app.Book.all[fetchIndex].author);
    $('#updateBook #isbn').attr('placeholder', app.Book.all[fetchIndex].isbn);
    $('#updateBook #image_url').attr('placeholder', app.Book.all[fetchIndex].image_url);
    $('#updateBook #description').attr('placeholder', app.Book.all[fetchIndex].description);

    $('#update-main').show();
    $('#updateBook').off('submit');
    $('#updateBook').on('submit', function(event){
      event.preventDefault();
      let book = {
        book_id: fetchone,
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.image_url.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value
      }
      app.Book.update(book);
    });
  }



  bookView.initFormPage = () => {
    $('.container').hide();
    $('#form-main').show();
    $('#addBook').off('submit');
    $('#addBook').on('submit', function(event){
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.image_url.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value
      }

      app.Book.create(book);
    });
  }




  module.bookView = bookView;
})(app);

$(app.Book.fetchAll(app.bookView.initIndexPage));

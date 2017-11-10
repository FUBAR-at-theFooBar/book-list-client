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
      if(app.Book.login === app.Book.TOKEN) bookView.initUpdatePage(fetchone, fetchIndex);
      else bookView.initAdminPage(fetchone);
    });
    $('#delete').on('click', function() {
      if(app.Book.login === app.Book.TOKEN) app.Book.delete(fetchone);
      else bookView.initAdminPage(fetchone);
    });
  }

  bookView.setTeasers = () => {
    let description = $('#detail-main p').text();
    let teaser = $('#detail-main p').text().substr(0, 200) + '...';
    $('#detail-main p').text(teaser);
    $('#detail-main').off('click');
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

    $('#update-main h2').text('Update: ' + app.Book.all[fetchIndex].title);

    $('#updateBook #title').val(app.Book.all[fetchIndex].title);
    $('#updateBook #title').attr('placeholder', app.Book.all[fetchIndex].title);

    $('#updateBook #author').val(app.Book.all[fetchIndex].author);
    $('#updateBook #author').attr('placeholder', app.Book.all[fetchIndex].author);

    $('#updateBook #isbn').val(app.Book.all[fetchIndex].isbn);
    $('#updateBook #isbn').attr('placeholder', app.Book.all[fetchIndex].isbn);

    $('#updateBook #image_url').val(app.Book.all[fetchIndex].image_url);
    $('#updateBook #image_url').attr('placeholder', app.Book.all[fetchIndex].image_url);

    $('#updateBook #description').val(app.Book.all[fetchIndex].description);
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

  bookView.initAdminPage = (fetchone) => {
    $('.container').hide();
    $('#admin-main').show();
    $('#admin').off('submit');
    $('#admin').on('submit', function(event){
      event.preventDefault();
      if(event.target.password.value !== app.Book.TOKEN) $('#incorrectPwd').text('incorrect password');
      else {
        app.Book.login = event.target.password.value;
        bookView.initDetailPage(fetchone);
      }
    })
  };

  module.bookView = bookView;
})(app);

$(app.Book.fetchAll(app.bookView.initIndexPage));

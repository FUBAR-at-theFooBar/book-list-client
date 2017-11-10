'use strict';

var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';
// var __API_URL__ = 'http://localhost:3000';
(function(module){

  function errorCallback(err) {
    console.error(err);
    app.errorView.initErrorPage(err);
  }

  // Declaring a Constructor function that assigns properties of Book objects
  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  // Array of all Book objects
  Book.all = [];

  // Renders all of the Book objects to HTML using the Handlebars template in index.html
  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#booklist-template').text());
    return template(this);
  }

  Book.prototype.detailToHtml = function() {
    var template = Handlebars.compile($('#detail-template').text());
    return template(this);
  }

  /* Why does toHtml have a protoype and loadAll doesn't again? */
  Book.loadAll = rawData => {
    /* What are we sorting by? */
    // rawData.sort((a, b) => )

    // Populating into the Book array each object in the rawData file
    Book.all = rawData.map(bookObject => new Book(bookObject));
  }

  // Grabs the raw data from our server, which communicates with our database to load the data from SQL tables. If successful, instantiates each result via the loadAll method into our Book constructor and loads it into our Book.all array.
  Book.fetchAll = callback => {
    $.get(`${__API_URL__}/api/v1/books`)
      .then (results => {
        Book.loadAll(results);
      })
      .then (callback)
      .catch (errorCallback);
  }

  Book.fetchOne = (ctx, callback) => {
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.book_id}`)
    // $.get(`${__API_URL__}/api/v1/books/1`)

      .then (results => {
        ctx.book = results[0];
        // Book.loadAll(results);//JB DOES NOT HAVE THIS IN HIS  FETCHONE
        callback();
      })
      .catch (errorCallback);
  }

  Book.update = (book) => {
    console.log(book.book_id);
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${book.book_id}/update`,
      method: 'PUT',
      data: book
    })
      .then(() => {console.log('updated'); page('/')})
      .catch(errorCallback);
  }

  // Article.prototype.updateRecord = function(callback) {
  //   $.ajax({
  //     url: `/articles/${this.article_id}`,
  //     method: 'PUT',
  //     data: {
  //       author: this.author,
  //       authorUrl: this.authorUrl,
  //       body: this.body,
  //       category: this.category,
  //       publishedOn: this.publishedOn,
  //       title: this.title,
  //       author_id: this.author_id
  //     }
  //   })
  //     .then(console.log)
  //     .then(callback);
  // };

  Book.create = book => {
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => {console.log('posted'); page('/')})
      .catch(errorCallback);
  }


  module.Book = Book;
})(app);

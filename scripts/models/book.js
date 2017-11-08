'use strict';

var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';

(function(module){


  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
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
        callback();
      })
      .catch (errorCallback);
  }

  Book.fetchOne = callback => {
    $.get(`${__API_URL__}/api/v1/books/${this.book_id}`)
      .then (results => {
        Book.loadAll(results);
        callback();
      })
      .catch (errorCallback);
  }

  Book.create = callback => {
    $.post(`${__API_URL__}/api/v1/books`, {
      title: this.title,
      author: this.author,
      image_url: this.image_url,
      isbn: this.isbn,
      description: this.description})
      .then(callback);
  }

  module.Book = Book;
})(app);

'use strict';

var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';

// (function(module){

  /* What is this function doing? */
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
    var template = Handlebars.compile($('#book-template').text());
    return template(this);
  }

  /* Why does toHtml have a protoype and loadAll doesn't again? */
  Book.loadAll => rawData => {
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
        if (callback) callback();
      })
      .catch (errorCallback);
  }

//   module.Book = Book;
// })(app);

Book.fetchAll();
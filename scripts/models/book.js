'use strict';

var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';

// (function(module){

function errorCallback(err){

}

//this pulls anything
function fetchAll(callback){
  $.get(`${__API_URL__}/api/v1/books`)
    .then(results => {
      console.log(results);
      // callback();
    })
}
fetchAll();
// Book.all = [];
// Book.loadAll = rows => Book.all = rows.sort(())

// app.Book = Book;
console.log('test');
// })()

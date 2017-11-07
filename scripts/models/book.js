'use strict';

var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';

function fetchAll() {
  $.get('/api/v1/books')
    .then(results => {
      console.log(results);
    });
}

console.log('test');
fetchAll();

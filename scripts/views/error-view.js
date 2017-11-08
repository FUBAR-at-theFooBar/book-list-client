var app = app || {};
var __API_URL__ = 'https://ncjh-booklist.herokuapp.com';

function errorCallback(errorObj){
  console.log(errorObj);
  initErrorPage(errorObj);
}

var errorView = {};

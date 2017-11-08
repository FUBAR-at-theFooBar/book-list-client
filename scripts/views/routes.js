'use strict'

page('/', ctx => {console.log('page connect /');
  app.Book.fetchAll(app.bookView.initIndexPage)});
// page('/books/:book_id', ctx => app.Book.fetchOne(app.bookView.initIndexPage)); //needs to connect to #detail-main;
page('/books/1', ctx => {console.log('page connect /books/:book_id');
  app.Book.fetchOne(app.bookView.initDetailPage)}); //needs to connect to #detail-main;

// page('/books/new', ctx => app.Book.fetchAll(app.bookView.initIndexPage))//needs to connect to #form-main;
page();


//adding click functions here

$('#Book1').click(()=>{
  app.Book.fetchOne(app.bookView.initDetailPage)
})
$('#Book2').click(()=>{
  app.Book.fetchOne(app.bookView.initDetailPage)
})
$('#Book3').click(()=>{
  app.Book.fetchOne(app.bookView.initDetailPage)
})
$('#Book4').click(()=>{
  app.Book.fetchOne(app.bookView.initDetailPage)
})
$('#Book5').click(()=>{
  app.Book.fetchOne(app.bookView.initDetailPage)
})


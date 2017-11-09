'use strict'

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));//needs to connect to #form-main;
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage)); //needs to connect to #detail-main;
page();


//adding click functions here
$('book-main').click(()=>{
  app.Book.fetchOne(app.bookView.initDetailPage)
})

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

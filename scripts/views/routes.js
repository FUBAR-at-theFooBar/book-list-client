'use strict'

page('/book-list-client/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));

page('/book-list-client/books/error', ctx => app.bookView.errorCallback(ctx));

page('/book-list-client/books/new', ctx => app.bookView.initFormPage(ctx));

//we incindentally wrote more complex buttons instead of pagejs functions for these but we left them in to show we understood the concept.
// page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
//
// page('/books/:book_id/update', ctx => initUpdatePage(ctx));

page();

'use strict'

page('/book-list-client/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));

page('/book-list-client/books/error', ctx => app.bookView.errorCallback(ctx));

page('/book-list-client/books/new', ctx => app.bookView.initFormPage(ctx));

// page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
//
// page('/books/update/:book_id', ctx => app.Book.update(ctx, app.bookView.initUpdatePage));

page();

'use strict'

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));

page('/books/error', ctx => app.bookView.errorCallback(ctx));

page('/books/new', ctx => app.bookView.initFormPage(ctx));

// page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage));
//
// page('/books/update/:book_id', ctx => app.Book.update(ctx, app.bookView.initUpdatePage));

page();

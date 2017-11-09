'use strict'

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', ctx => app.bookView.initFormPage(ctx));//needs to connect to #form-main;
page('/books/:book_id', ctx => app.Book.fetchOne(ctx, app.bookView.initDetailPage)); //needs to connect to #detail-main;
page();


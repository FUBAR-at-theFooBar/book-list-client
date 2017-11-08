'use strict'

page('/', ctx => app.Task.fetchAll(app.taskView.initIndexPage));
page('/tasks/add', ctx => app.taskView.initAddForm(ctx));
// page('/tasks:task_id', ctx => app.Task.fetchOne(ctx, app.taskView.initDetailPage));//this is not part of our lab
page();



//in server.js add body parser

app.post('tasks/add', bodyParser, (req,res) => {
  let{title, description, category, contact, status} = req.body;//sets up function using express to set title = req.body.title later in the code

  client.query(`
    INSERT INTO tasks(title, description, category, contact, status)
    VALUES($1, $2, $3, $4, $5)`,
    [title, description, category, contact, status]
  )
    .then(results => res.sendStatus(201))
    .catch(console.error);
});

//in task.js
task.createTask = task => {
//make ajax to redirect
  $.post(`${__API_URL__}/tasks/add`, task)
    .then(() => page('/'))//redirect back to homepage after adding
    .catch(errorCallback);
  module.task = task;
}

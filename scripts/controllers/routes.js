'use strict'

page('/', ctx => app.Task.fetchAll(app.taskView.initIndexPage));
page('/tasks/add', ctx => app.taskView.initAddForm(ctx));
page();



//in server.js add body parser

app.post('/tasks/add', bodyParser, (req,res) => { //in server, listens for /tasks/add, querys db to insert them in, returns a status showing complete
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
task.createTask = task => {//takes task from initAddForm
//make ajax to redirect
  $.post(`${__API_URL__}/tasks/add`, task)
    .then(() => page('/'))//redirect back to homepage after adding to db
    .catch(errorCallback);
  module.task = task;
}

//in task-view.js
function reset() {
  $('.container').hide();
  // show something
}

taskView.initAddForm = function(){//on submit in the form-- then sends the object to ccreateTask
  let task ={
    title:  event.target.title.value,
    desctiprion:  event.target.desctiprion.value,
    category:  event.target.category.value,
    contact:  event.target.contact.value,
    status:  event.target.status.value,

  };

  module.Task.createTask(task);
}

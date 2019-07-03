const express = require('express')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{title: "" , body: ""}];

// setting up
const app = express();

// setting template engine
app.set("view engine","ejs");
// USE MIDDLE WARE TO SERVE STATIC FILES 
app.use(express.static('./public'));



// ############### ROUTES ##############

// Get for tasks: returns all tasks
app.get('/', (req, res) => { 
    // rendering task view and passing task to do data 
    res.render('home', {taskToDo: dummyData});
});

app.get('/week1', (req, res) => { 
    // rendering task view and passing task to do data 
    res.render('week1', {taskToDo: dummyData});
});

app.get('/week2', (req, res) => { 
    // rendering task view and passing task to do data 
    res.render('week2', {taskToDo: dummyData});
});

app.get('/week3', (req, res) => { 
    // rendering task view and passing task to do data 
    res.render('week3', {taskToDo: dummyData});
});

app.get('/week4', (req, res) => { 
    // rendering task view and passing task to do data 
    res.render('week4', {taskToDo: dummyData});
});


// Post for tasks: posting a task
app.post('/', urlEncoded, (req, res) =>{
//   console.log("hitting Post route");
// formating for incoming data to add to my data set
  let incomingItem = {}
  incomingItem.title = req.body.title
  incomingItem.body= req.body.body;
  dummyData.push(incomingItem)
 console.log(dummyData)
  res.redirect('/');
});
// deleting specified task 
app.delete("/:id", function(req, res){
    // deleting item from data set 
    dummyData.splice(req.params.id, 1);
    // console.log(dummyData);
    res.json(dummyData)
});

app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port ')
})
const express = require('express')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{taskItem: "Work on my portfolio" },{taskItem: "Code and watch anime"},{taskItem: "Sleep"}];

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
    res.render('tasks', {taskToDo: dummyData});
});

// Post for tasks: posting a task
app.post('/', urlEncoded, (req, res) =>{
//   console.log("hitting Post route");
// formating for incoming data to add to my data set
  let incomingItem = {}
  incomingItem.taskItem = req.body.task
  dummyData.push(incomingItem)
 console.log(dummyData)
  res.redirect('/')
});
// deleting specified task 
app.delete("/tasks/:id", function(req, res){
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
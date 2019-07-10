const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql');

const db = mysql.createConnection({
 host     : 'localhost',
 user     : 'admin',
 password : 'student',
 database : 'blog'
});

db.connect(function(err){
   if (err) throw err
   console.log("My SQL is connected");
});

const urlEncoded = bodyParser.urlencoded({extended: false});

const dummyData = [{title: "something" , week: "int", body: "something"}];

// setting up
const app = express();

// setting template engine
app.set("view engine","ejs");
// USE MIDDLE WARE TO SERVE STATIC FILES 
app.use(express.static('./public'));



// ############### ROUTES ##############

// Get for tasks: returns all tasks
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM blogInfo';
    db.query(sql, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        res.render('home', {blogInfo: results});
    });
});

// Post for tasks: posting a task
app.post('/', urlEncoded, (req, res) =>{
  let incomingItem = {}
  incomingItem.blogtitle = req.body.title;
  incomingItem.blogbody = req.body.body;
  incomingItem.week= req.body.week;
  let sql =  'INSERT INTO blogInfo SET ?';
  db.query(sql, incomingItem ,(err, result) =>{
    if(err) throw err;
    console.log(result);
    res.redirect('/')
  });
});

app.get('/blogredirect/:ID', (req, res) =>{
    console.log(req.params.ID)
    let sql =  'SELECT * FROM blogInfo WHERE ID=' + req.params.ID;
    db.query(sql, (err, result) =>{
      if(err) throw err;
      console.log(result);
      res.render('blogredirect', {blogInfo: result[0]})
    });
});


// deleting specified task 
// app.delete("/:id", function(req, res){
//     let sql = 'DELETE FROM blogInfo WHERE ID=' + req.params.id;
//     db.query(sql,(err, result) =>{
//         if(err) throw err;
//         console.log(result);
//         res.json(result)
//     });
// });

app.listen(4000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port ')
})



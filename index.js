//Required dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//CSS file
app.use(express.static("public"));

var list_of_task = [];
var completed_task = [];

// Remove task
app.post("/removetask", function(req, res) {
    var completed = req.body.check;
    //Checking type of file
    if (typeof completed === "string") {
        completed_task.push(completed);
        //if exists then remove
        list_of_task.splice(list_of_task.indexOf(completed), 1);
    } else if (typeof completed === "object") {
        for (var i = 0; i < completed.length; i++) {
            completed_task.push(completed[i]);
            list_of_task.splice(list_of_task.indexOf(completed[i]), 1);
        }
    }
    res.redirect("/");
});


//Add task
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //push new task in list
    list_of_task.push(newTask);
    res.redirect("/");
});


//render the app
app.get("/", function(req, res) {
    if(list_of_task == undefined) res.render("index");
    else res.render("index", { list_of_task: list_of_task, completed_task: completed_task });
});

//listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});

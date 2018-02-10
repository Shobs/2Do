//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//render css files
app.use(express.static("public"));

var list_of_task = [];
var completed_task = [];

app.post("/removetask", function(req, res) {
    var completed = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completed === "string") {
        completed_task.push(completed);
        //check if the completed task already exits in the task when checked, then remove it
        list_of_task.splice(list_of_task.indexOf(completed), 1);
    } else if (typeof completed === "object") {
        for (var i = 0; i < completed.length; i++) {
            completed_task.push(completed[i]);
            list_of_task.splice(list_of_task.indexOf(completed[i]), 1);
        }
    }
    res.redirect("/");
});


//post route for adding new task
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    list_of_task.push(newTask);
    res.redirect("/");
});


//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    if(list_of_task == undefined) res.render("index");
    else res.render("index", { list_of_task: list_of_task, completed_task: completed_task });
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});

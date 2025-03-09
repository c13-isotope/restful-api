const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {   
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding!"
    },
    {   
        id: uuidv4(),
        username: "Abhishek",
        content: "Hard work is important to achieve success"
    },
    {   
        id: uuidv4(),
        username: "Datta",
        content: "i got selected for my 1st internship"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newContent;
        console.log(post);
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("Listening to port: 8080");
});
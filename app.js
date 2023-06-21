const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const _ = require("lodash")
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.use(session({
  secret: 'power talks to power',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session())

mongoose.connect('mongodb+srv://shubhatRashid:Ilovecoding@cluster0.vus6dpg.mongodb.net/todoListDB');

const listSchema = mongoose.Schema({
    listName : String,
    items : Array
  })

const userSchema = mongoose.Schema({
  name : String,
  email : String,
  Password : String,
  lists : [listSchema]
})

userSchema.plugin(passportLocalMongoose);

const List = mongoose.model("List",listSchema)
const User = mongoose.model("User",userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const defaultArray = [{name:"Hi,Write and Press +"},{name:"To delete check and press delete"}]

app.get("/",function(req,res){

  if (req.isAuthenticated()){

    User.findOne({name:req.user.username}).then(
      result => {
        User.find({}).then(Result =>{
                  res.render("lists.ejs",{titleItem:"Today",listTypes:result.lists,nextItem:result.lists})
                })
      })
  }else{
    res.render("login.ejs")
  }
})

app.post("/",function(req,res){
  User.updateOne({name:req.user.username,"lists.listName" :req.body.list}, {
    '$push': {
       "lists.$.items": {name: req.body.say}
    }
  }).then(res.redirect("/"+req.body.list))
})

app.get('/signup',(req,res) =>{
  res.render("SignUp.ejs")
})

app.post('/signUp',(req,res) =>{
  User.register({
    username:req.body.userName,
    name : req.body.userName,
    email:req.body.email,
    password : "",
    lists :[{
      listName:"Today",
      items:defaultArray}]
  },req.body.Password,function(err,user){
    if (err){
      console.log(err)
      res.redirect("/signup")
    }else{
      res.redirect("/")
    }
  })
})

app.get('/login',(req,res) =>{
  res.render("login.ejs")
})


app.post("/login",(req,res)=>{

  const user = new User({
    username : req.body.username,
    password: req.body.password
  }); 

  req.login(user,function(err){
    if (err) {
      console.log(err)
    }else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/")
      })
    }
  })
})

app.post("/delete",(req,res)=>{
  User.findOneAndUpdate({name:req.user.username,"lists.listName" :req.body.ListName}, {
    '$pull': {
       "lists.$.items": {name: req.body.checkbox}
    }
  }).then(res.redirect("/"))
})

app.post("/newList", (req,res) =>{
  User.updateOne({name:req.user.username}, {
    '$push': {
       lists: {
        listName:req.body.newList,
        items:defaultArray}
    }
  }).then(res.redirect("/"))
})

app.get("/:name",function(req,res){
  if (req.isAuthenticated() && req.params.name === "logout"){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }
  else if (req.isAuthenticated()){
  User.findOne({name:req.user.username}).then(
    result => {
      User.find({}).then(Result =>{
                res.render("lists.ejs",{titleItem:req.params.name,listTypes:result.lists,nextItem:result.lists})
              })
    })
  }else{
    res.redirect("/")
  }
})

app.post("/deleteList",(req,res)=>{
  User.findOneAndUpdate({name:req.user.username,"lists.listName" :req.body.ListName}, {
    '$pull': {
       lists: {listName:req.body.checkbox}
    }
  }, {new: true}).then(res.redirect("/"))
})

app.listen(3400,function(){
    console.log("server up and running , listening to port 3400")
})

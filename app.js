const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const _ = require("lodash")
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect('mongodb+srv://shubhatRashid:Ilovecoding@cluster0.vus6dpg.mongodb.net/todoListDB');
var isLoggedIn = false
var userMail = ''
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
const List = mongoose.model("List",listSchema)
const User = mongoose.model("User",userSchema)

const defaultArray = [{name:"Hi,Write and Press +"},{name:"To delete check and press delete"}]

app.get("/",function(req,res){

  if (isLoggedIn){

    User.findOne({email:userMail}).then(
      result => {
        User.find({}).then(Result =>{
                  res.render("lists.ejs",{titleItem:"Today",listTypes:result.lists,nextItem:result.lists})
                })
      })
  }else{
    res.render("SignUp.ejs")
  }
})

app.post("/",function(req,res){
  User.updateOne({email:userMail,"lists.listName" :req.body.list}, {
    '$push': {
       "lists.$.items": {name: req.body.say}
    }
  }).then(res.redirect("/"+req.body.list))
})

app.get('/signup',(req,res) =>{
  res.render("SignUp.ejs")
})

app.post('/signUp',(req,res) =>{
  const user = new User({
    name : req.body.userName,
    email:req.body.email,
    Password : req.body.Password,
    lists :[{
      listName:"Today",
      items:defaultArray}]
  })
  user.save()
  res.render("login.ejs")
})

app.get('/login',(req,res) =>{
  res.render("login.ejs")
})


app.post("/login",(req,res)=>{
  User.findOne({email:req.body.email,Password:req.body.password}).then(
    result => {
      if (result === null){
        res.render("login.ejs")
      }else{
        isLoggedIn = true
        userMail = req.body.email
        res.redirect("/")
      }
    }
  )
})

app.post("/delete",(req,res)=>{
  User.findOneAndUpdate({email:userMail,"lists.listName" :req.body.ListName}, {
    '$pull': {
       "lists.$.items": {name: req.body.checkbox}
    }
  }).then(res.redirect("/"))
})

app.post("/newList", (req,res) =>{
  User.updateOne({email:userMail}, {
    '$push': {
       lists: {
        listName:req.body.newList,
        items:defaultArray}
    }
  }).then(res.redirect("/"))
})

app.get("/:name",function(req,res){
  if (isLoggedIn){
  User.findOne({email:userMail}).then(
    result => {
      User.find({}).then(Result =>{
                res.render("lists.ejs",{titleItem:req.params.name,listTypes:result.lists,nextItem:result.lists})
              })
    })
  }else{
    res.render()
  }
})

app.post("/deleteList",(req,res)=>{
  User.findOneAndUpdate({email:userMail,"lists.listName" :req.body.ListName}, {
    '$pull': {
       lists: {listName:req.body.checkbox}
    }
  }, {new: true}).then(res.redirect("/"))
})

/

app.listen(3400,function(){
    console.log("server up and running , listening to port 3400")
})

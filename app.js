const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const _ = require("lodash")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');

const itemSchema = mongoose.Schema({
  name:String
})
const Item = mongoose.model("Item",itemSchema)

const listSchema = mongoose.Schema({
  name : String,
  items : []
})
const List = mongoose.model("List",listSchema)

const defaultArray = [{name:"Hi,Write and Press +"},{name:"To delete check and press delete"}]

app.get("/",function(req,res){

    Item.find({}).then(result => {
      if (result.length === 0){
        Item.insertMany(defaultArray)
        res.redirect("/")
      }
      else{
            res.render("lists.ejs",{titleItem:"Today",nextItem:result})
      }
    })

})

app.get("/:name",function(req,res){
    const customListName = _.upperCase(req.params.name)

    List.findOne({name:customListName}).then(result => {

      if (result === null){
          const list = new List({
          name:customListName,
          items:defaultArray
         })
         list.save()
         res.redirect("/"+customListName)
      }else{
         res.render("lists.ejs",{titleItem:customListName,nextItem:result.items})
      }
   })

})

app.get("/about",function(req,res){
    res.render("about.ejs")
})

app.post("/delete",function(req,res){
  var id = req.body.checkbox
  var ListName = req.body.ListName
  console.log(id)
  if (ListName === "Today"){
    id = req.body.checkbox
    Item.deleteOne({name:id}).then(err=>{console.log(err)})
    res.redirect("/")
  }else{
        List.findOneAndUpdate({name:ListName},{$pull:{items:{name:id}}}).then(err=>{
          console.log(err)
          res.redirect("/"+ListName)
        })
  }

})



app.post("/",function(req,res){
    var newItem = req.body.insertMany
    var newList = req.body.list
    newItem = new Item ({
      name : req.body.say
    })

    if (newList === "Today"){
      newItem.save()
      res.redirect("/")

    }else{
      List.findOne({name:newList}).then(result => {
        result.items.push(newItem)
        result.save()
        res.redirect("/"+ newList)
      })
    }


    //
    })





app.listen(3400,function(){
    console.log("server up and running , listening to port 3400")
})

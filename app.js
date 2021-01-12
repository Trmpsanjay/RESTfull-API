const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));





// Database Connection Setup
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});
const articleSchema = {
  title :String,
  content : String
};
const Article = mongoose.model("Article",articleSchema);

// Express Routing request targetting all documents
app.route("/articles")
  .get(function(req,res){
    Article.find(function(err,foundarticles){
      if(!err){
        res.send(foundarticles);
      }
    });
  })

  .post(function(req,res){
    const article = new Article({
      title:req.body.title,
      content: req.body.content
    });
    article.save(function(err){
      if(!err){
        res.send("Succesfully added");
      }
    });
  })

  .delete(function(req,res){
    Article.deleteMany(function(err){
      if(err){
        res.send(err);
      }else{
        res.send("Successfully Deleted the article");
      }
    });
  });

// Express Routing request targetting a Specific documents

app.route("/articles/:articleTitle")

.get(function(req,res){
  Article.findOne({title : req.params.articleTitle},function(err,foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    }else{
      res.send("Article not available");
    }
  });
})


.put(function(req, res){

Article.update(
  {title: req.params.articleTitle},
  {title: req.body.title, content: req.body.content},
  {overwrite: true},
  function(err){
    if(!err){
      res.send("Successfully updated the selected article.");
    }
  }
);
})
.patch(function(req,res){

  Article.update(
    {title: req.params.articleTitle},
    {$set :req.body},
    function(err){
      if(err){
        res.send(err);
      }else{
        res.send("Succesfully Updated required field");
      }
    }
  );
})

.delete(function(req,res){
  Article.deleteOne(
  {title:req.params.articleTitle},
  function(err){
    if(err){
      res.send(err);
    }else{
      res.send("Deleted Successfully Specified Application");
    }
  }
);
});



app.get("/",function(req,res){
  res.send("<h1> Hello Mr Sanjay</h1>");
});




app.listen(3000,function(){
  console.log("Server Succesfully started at 3000");
})






//
// {
// "_id": "5c18e1892998bdb3b3d355bf",
// "title": "REST",
// "content": "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
// },
// {
// "_id": "5c139771d79ac8eac11e754a",
// "title": "API",
// "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
// },
// {
// "_id": "5c1398aad79ac8eac11e7561",
// "title": "Bootstrap",
// "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
// },
// {
// "_id": "5c1398ecd79ac8eac11e7567",
// "title": "DOM",
// "content": "The Document Object Model is like an API for interacting with our HTML"
// },
// {
// "_id": "5c18f35cde40ab6cc551cd60",
// "title": "Jack Bauer",
// "content": "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
// "__v": 0
// },
// {
// "_id": "5ffc1a15298cdb3e707b9c20",
// "title": "React",
// "content": "A JavaScript library for building user interfaces",
// "__v": 0
// },
// {
// "_id": "5ffc200e298cdb3e707b9c21",
// "title": "Angular",
// "content": "AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. AngularJS's data binding and dependency injection eliminate much of the code you would otherwise have to write",
// "__v": 0
// }

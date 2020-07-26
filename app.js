//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");
const PostSchema={
  PostTitle:String,
  PostContent:String
};
mongoose.connect("mongodb://localhost:27017/Blogdb",{useNewUrlParser:true});
const Post=mongoose.model("Post",PostSchema);


const homeStartingContent = "Well ,Hello Everyone My Name Well... Let\'s keep that a secret call me Mr Anonymous if you\'d like.. This page\r\n is all about letting you know that if you are a mediocre human being then there\'s nothing wrong with it and sometimes it\'s kind of  good to be frank .The So called society has had a taboo about being the best and that fucks with a young kids mind trust me I\'ve been there and sort of got over it. All over the internet you see documentries of people who are famous and have achieved something great and people also love to read about their struggle .What they dont\' want you to read .... is well ....Find Out Your Self \r \n \r ~ Mr Anonymous";


const aboutContent = "Uh-oh you came snooping .. That\'s not good but I must encourage it because \r\nsince this is my personal space and you did Enter Into it \r\nI would give you a snippet of information from my Personal Life \r\nI am still a Student .. So.... What-so-ever I have said here using my anonymity is because \r\nI was scared of being judged by the outside world and no matter how weak it may sound \r\nIt does or i may say it did affect me of what people think about me ...\r\nThis was how the page got created and to It\'s current shape...\r\nNow that you\'ve done reading the entire thing a new Post(s).. awaits\/await (yeah I do that sometimes ) ...\r\n\r\n\r\n \n\n~Mr Anonymous ";

const contactContent="Well ther\'s currently.. Nothing Here because it basically \n defeats the purpose of being an Anonymous... So Why do think \nthis page exists? It\'s because someday I might have the courage to make myself public and come out as an indivisual who might just have told enough to make a difference..... \nTill then ....   Peace Out "
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//let posts=[];

app.get("/", function(req, res){
  Post.find({},function(err,posts){
    if(!err)
    {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
        });
    }
    if(err)
    {
      console.log("err");
    }
  });
  });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
    const temp= new Post({
      PostTitle:req.body.postTitle,
      PostContent:req.body.postBody,
    });
    temp.save(function(err){
   if (!err){
     res.redirect("/");
   }
   else
   {
     console.log(err);
   }

 });

});

app.get("/posts/:postId", function(req, res){
const requestedPostId = req.params.postId;
//console.log(requestedPostId);

Post.findOne({_id: requestedPostId}, function(err, post){
  //console.log(post);

    res.render("post", {
      title: post.PostTitle,
      content: post.PostContent
   });
 });

  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  //
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

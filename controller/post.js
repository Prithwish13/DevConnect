const Post = require("../models/Post");
const {validationResult} =require('express-validator');
const { removerFile } = require("../helper/removeFile");

exports.getPosts = async (req,res,next)=>{
    try {
        const posts = await Post.find();
        if(!posts){
           return res.json({message:'no posts has been found'});
        }
        res.json({
            message:'fetched the post Successfully',
            posts:posts
        });

    } catch (error) {
        console.log(error);
    }
};

exports.createPost = async (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let errObj={}
        errors = errors.array();
        for (let i of errors){
            errObj[i.param] = i.msg;
        }
        return res.status(400).json(errObj);
    }
    
    const postField = {};
    postField.user = req.user.id;
    if(req.file){
        postField.image = req.file.path.replace('\\','/');
    }else{
        postField.image = "";
    }
    for(let field in req.body){
        if(field==='title' || field==='text' || field ==='iamge'){
            postField[field] = req.body[field] ? req.body[field] : '';
        }
    }
    try {
        const newPost = new Post(postField);
        const post = await newPost.save();
        res.status(200).json({
            message:'Post created successfully',
            post:post
        });
    } catch (error) {
        console.log(error);
    }
};

exports.updatePost = async (req,res,next) =>{
    const postId = req.params.postId;
    const errors = validationResult(req);
    if(!postId){
        return res.status(400).json({
            error:'post id not define'
        })
    }

    if(!errors.isEmpty()){
        let errObj={}
        errors = errors.array();
        for (let i of errors){
            errObj[i.param] = i.msg;
        }
        return res.status(400).json(errObj);
    }
    try {
        const {title,text} = req.body;
    //fetching the post by using postId
    const post = await Post.findById(postId);
    if(!post){
        return res.status(400).json({
            error:'No post found with that Id'
        })
    }
    if(post.user.toString() !== req.user.id.toString() ){
        return res.status(400).json({
            error:'You are not authorized'
        })
    }
    if(req.file){
        removerFile(post.image);
        post.image = req.file.path.replace('\\','/');  
    }
    post.title = title;
    post.text = text;

    const result = await post.save();

    res.status(200).json({
        message:'status Updated successfully',
        post:result
    })

    } catch (error) {
        console.log(error);
    }
};

exports.hitLike = async (req,res,next) => {
    const postId = req.params.postId;
    if(!postId){
        return res.status(400).json({
            error:'something went wrong'
        });
    }
    try {
    const post = await Post.findById(postId);
    if(!post){
        return res.status(400).json({
            message:'Post is no longer exists'
        })
    }
    
    const userLikeIndex =post.likes.findIndex(like=>like.user.toString()===req.user.id.toString());
    if(userLikeIndex > -1){
        const newLikes = post.likes.filter(like => like.user.toString() !== req.user.id.toString());
        post.likes=newLikes;
    }else{
        post.likes.unshift({user:req.user.id});
    }
    const updatedPost = await post.save();
    res.status(200).json({
        message:'like Successfull',
        post:updatedPost
    })
    } catch (error) {
        console.log(error);
    }
};

exports.getComments = async (req,res,next) => {
    const postId = req.params.postId;
    
    try {
        const post = await Post.findById(postId);
        if(!post){
            return res.status(403).json({
                message:'Post Not found'
            });
        }
        const comments =  post.comments;
        res.status(200).json({
            comments:comments
        });
    } catch (error) {
        console.log(error);
    }
};

exports.postComment = async (req,res,next) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      let errObj={}
      errors = errors.array();
      for (let i of errors){
          errObj[i.param] = i.msg;
      }
      return res.status(400).json(errObj);
    }
    const {text} = req.body;
    const newComment = {};
    const post =  await Post.findById(postId);
    newComment.user=req.user.id;
    newComment.text=text;

    post.comments.unshift(newComment);

    const result = await post.save();
    res.status(200).json({
        message:'comment posted successfully',
        post:result
    })
};

//for updating the comment
exports.updateComment = async (req,res,next) => {
    const {postId,commentId} = req.params;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      let errObj={}
      errors = errors.array();
      for (let i of errors){
          errObj[i.param] = i.msg;
      }
      return res.status(400).json(errObj);
    }
    const {text} = req.body;
   try {
        //find the post
    const post = await Post.findById(postId);
    if(!post){
        return res.status(403).json({
            message:'No post hasbenn found'
        })
    }
    const commentIndex =  post.comments.findIndex(comment=>comment._id.toString() === commentId.toString());
    if(commentIndex < 0){
        return res.status(403).json({
            message:'No comment Found'
        });
    }
    if(post.comments[commentIndex].user.toString()!== req.user.id.toString()){
        return res.status(401).json({
            message:'You are not Authorized',
            error:'Unauthorize'
        })
    }
    post.comments[commentIndex].text=text;
    const result = await post.save();
    res.status(200).json({
        message:'comment updated successfully',
        post:result
    });
   } catch (error) {
       console.log(error);
   }

}

//delete comment
exports.deleteComment = async (req,res,next) => {
    const {postId,commentId} = req.params;
    try {
        const post = await Post.findById(postId);
        if(!post){
         return res.status(403).json({
            message:'No post hasbenn found'
         })
        }
        const commentIndex =  post.comments.findIndex(comment=>comment._id.toString() === commentId.toString());
        if(commentIndex < 0){
            return res.status(403).json({
            message:'No comment Found'
        });
        }
        if(post.comments[commentIndex].user.toString()!== req.user.id.toString()){
        return res.status(401).json({
            message:'You are not Authorized',
            error:'Unauthorize'
        })
        }
        const updatedComments = post.comments.filter(comment=>comment._id.toString() !== commentId.toString());
        post.comments = updatedComments;
        const result =  await post.save();
        res.status(200).json({
        message:'comment deleted successfully',
        post:result
    });
    
    } catch (error) {
        console.log(error);
    }
}

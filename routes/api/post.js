const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getPosts,createPost,updatePost, hitLike, getComments, updateComment, postComment,deleteComment, deletePost } = require('../../controller/post');
const { createPostValidator, commentValidator } = require('../../validation/postValidation');

// @route GET api/posts
// @desc  get all post available
// @access Public
router.get('/posts',getPosts);

// @route POST api/post/create
// @desc  creates a post 
// @access private
router.post('/create',passport.authenticate('jwt',{session:false}),createPostValidator,createPost);

// @route POST api/post/create
// @desc  creates a post 
// @access private
router.put('/update/:postId',passport.authenticate('jwt',{session:false}),createPostValidator,updatePost);

// @route DELETE api/post/remove
// @desc  creates a post 
// @access private
router.delete('/remove/:postId',passport.authenticate('jwt',{session:false}),deletePost);

// @route GET api/post/like/:postId
// @desc  likes a post 
// @access private
router.get('/like/:postId',passport.authenticate('jwt',{session:false}),hitLike);

// @route GET api/post/comments
// @desc  getting all the comments
// @access public
router.get('/comments/:postId',getComments);

// @route POST api/post/comments
// @desc  post a comment
// @access private
router.post('/comment/:postId',passport.authenticate('jwt',{session:false}),commentValidator,postComment);

// @route PUT api/post/comments
// @desc  post a comment
// @access private
router.put('/comment/:postId/:commentId',passport.authenticate('jwt',{session:false}),commentValidator,updateComment);

// @route DELETE api/post/comments
// @desc  post a comment
// @access private
router.delete('/comment/:postId/:commentId',passport.authenticate('jwt',{session:false}),deleteComment)

module.exports=router;
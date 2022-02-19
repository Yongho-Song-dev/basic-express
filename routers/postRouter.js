const express = require('express');
const postRouters = express.Router();

const {
    getAllPost,
    getWrite,
    postWrite,
    getOnePost,
    getEditPost,
    postEditPost,
    deleteOnePost,
    deleteAllPost,
  } = require('../controllers/postControllers');


// 모든 게시글 조회
postRouters.get('/', getAllPost);

// 게시글 작성 get , post 
postRouters.get('/post', getWrite);
postRouters.post('/post', postWrite);


// 게시글 전체 DELETE 
postRouters.delete('/post/all', deleteAllPost);

// 특정 게시글 get, delete  - postId parameter regex
postRouters.get('/post/:postId', getOnePost);
postRouters.delete('/post/:postId', deleteOnePost);


// 게시글 수정 get, post
postRouters.get('/post/edit/:postId', getEditPost);
postRouters.post('/post/edit/:postId', postEditPost);

// 게시글 module exports
module.exports = postRouters;


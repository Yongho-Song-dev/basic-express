const Post = require('../models/Post');

// 모든 게시글 조회
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).render('board', { posts }); // board view render
  } catch(error) {
    res.status(400).send({
      error: error.message 
    });
  }
};

// 작성 페이지 ( view : write ) HTTP method : get
const getWrite = (req, res) => {
  try {
    res.status(200).render('write');
  } catch(error) {
    res.status(400).send({
        error: error.message 
    });
  }
};

// page post   , HTTP method : post
const postWrite = async (req, res) => {
  try {
      // post.js에서 정의한 3개의 key 
    const {
      body: { title, contents, writer },
    } = req;
    const post = await Post.create({
      title,
      contents,
      writer,
    });
    res.redirect(`/board/post/${post._id}`); // 브라우저 redirect
    // 게시글을 작성한 뒤, 해당 게시글의 상세 페이지로 이동
  }catch(error) {
      res.status(400).send({
          error: error.message 
    });
  }
};


// 게시글 전체 DELETE   , HTTP method : DELETE
const deleteAllPost = async (req, res) => {
try {
    await Post.deleteMany({});
    res.sendStatus(204);
  } catch(error) {
      res.status(400).send({
          error: error.message 
      });
  }
};


// 게시물들 중에서 특정 게시물 get,  HTTP method : get
// post/:postid 
const getOnePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('post', { post });
  } catch(error) {
      res.status(400).send({
          error: error.message 
      });
  }
};

// 게시물들 중에서 특정 게시물 삭제 , HTTP method : DELETE
// post/:postID
const deleteOnePost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    await Post.findOneAndDelete({ _id: postId });
    res.sendStatus(204);
  } catch(error) {
      res.status(400).send({
          error: error.message 
      });
  }
};


// 특정 게시글 수정 페이지 get /post/edit/:postId , HTTP method : get
const getEditPost = async (req, res) => {
  try {
    const {
      params: { postId },
    } = req;
    const post = await Post.findOne({ _id: postId });
    res.status(200).render('editPost', { post });
  } catch (error) {
      res.status(400).send({
          error: error.message 
      });
  }
};

// 특정 게시글 수정 페이지 post /post/edit/:postId , HTTP method : post
const postEditPost = async (req, res) => {
    try {
        const {
            params: { postId },
            body: { title, contents},
        } = req;
        await Post.findOneAndUpdate({ _id: postId}, { title, contents } );
        res.redirect(`/board/post/${postId}`);
    } catch(error) {
        res.status(400).send({
          error: error.message
        });
    }
};

module.exports = {
deleteAllPost,
getAllPost,
getWrite,
postWrite,
getOnePost,
getEditPost,
postEditPost,
deleteOnePost,
};
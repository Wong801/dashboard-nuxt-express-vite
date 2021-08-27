const { Router } = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { loadPostCollection } = require('../database/posts');
const { loadUserCollection } = require('../database/users');

const upload = multer();
const router = Router();
const privateKey = process.env.PRIVATE_KEY

// get posts
router.get('/get', upload.none(), async (req, res) => {
  const users = await loadUserCollection();
  const posts = await loadPostCollection();
  if(req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    const user = jwt.verify(token[1], privateKey);
    const found = await users.findOne({ _id: new ObjectId(user.id) })
    if(found) {
      const postsData = req.query.username ? await posts.find({ author: req.query.username }).toArray() : await posts.find().toArray()
      return res.status(200).json({
        'success': true,
        'data': postsData.reverse(),
        'msg': 'success'
      })
    } else {
      return res.status(400).json({
        'success': false,
        'data': [],
        'msg': 'Invalid token.'
      })
    }
  } else {
    return res.status(401).json({
      'success': false,
      'data': [],
      'msg': 'Invalid token.'
    })
  }
})

// upload post
router.post('/create', upload.none(), async (req, res) => {
  const posts = await loadPostCollection();
  if(req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    const user = jwt.verify(token[1], privateKey);
    if(!req.body.content) {
      return res.status(400).json({
        'success': false,
        'msg': 'Content cannot be empty!'
      })
    } else {
      const post = {
        created_at: new Date(),
        content: req.body.content,
        created_by: new ObjectId(user.id),
        author: user.username,
        likes: 0,
        comments: [],
      }
      await posts.insertOne(post)
      return res.status(201).json({
        'success': true,
        'msg': 'post successfully created.'
      })
    }
  } else {
    return res.status(401).json({
      'success': false,
      'msg': 'Invalid token.'
    })
  }
})

// delete post
router.delete('/delete/:id', upload.none(), async (req, res) => {
  const posts = await loadPostCollection();
  if(req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    const user = jwt.verify(token[1], privateKey);
    const post = await posts.findOne({
      created_by: new ObjectId(user.id),
      _id: new ObjectId(req.params.id)
    })
    if(post) {
      await posts.deleteOne({
        created_by: new ObjectId(user.id),
        _id: new ObjectId(req.params.id)
      })
      return res.status(200).json({
        'success': true,
        'msg': 'post deleted successfully.'
      })
    } else {
      return res.status(400).json({
        'success': false,
        'msg': 'you do not have permission to do that!'
      })
    }
  } else {
    return res.status(401).json({
      'success': false,
      'msg': 'Invalid token.'
    })
  }
})

module.exports = router

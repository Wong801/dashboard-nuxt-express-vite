const { Router } = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loadUserCollection } = require('../database/users');

const upload = multer();
const router = Router();
const privateKey = process.env.PRIVATE_KEY;

// register
router.post('/register', upload.none(), async (req, res) => {
  if(!req.body.email) {
    return res.status(400).json({
      'success': false,
      'msg': 'email cannot be empty.'
    })
  } else if(!req.body.firstName) {
    return res.status(400).json({
      'success': false,
      'msg': 'first name cannot be empty.'
    })
  } else if(!req.body.lastName) {
    return res.status(400).json({
      'success': false,
      'msg': 'last name cannot be empty.'
    })
  } else if(!req.body.username) {
    return res.status(400).json({
      'success': false,
      'msg': 'username cannot be empty.'
    })
  } else if(!req.body.password) {
    return res.status(400).json({
      'success': false,
      'msg': 'password cannot be empty.'
    })
  } else if(req.body.password.length < 7) {
    return res.status(400).json({
      'success': false,
      'msg': 'password length must be 8 or more.'
    })
  } else{
    // check the user if already registered
    const users = await loadUserCollection();
    const user = await users.findOne({ email: req.body.email })
    if(user || await users.findOne({ username: req.body.username })) {
      return res.status(400).json({
        'success': false,
        'msg': 'User already exists.'
      })
    } else {
      // hash the password
      const hash = bcrypt.hashSync(req.body.password, 10);
      await users.insertOne({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hash
      })
      return res.status(201).json({
        'success': true,
        'msg': 'Successfully registered.'
      })
    }
  }
})

// login
router.post('/login', upload.none(), async (req, res) => {
  const users = await loadUserCollection();
  // check if user is not register yet
  const user = await users.findOne({ email: req.body.username })
  if(!user) {
    const user = await users.findOne({ username: req.body.username })
    if(!user) {
      return res.status(400).json({
        'success': false,
        'msg': 'Incorrect username or password.'
      })
    } else {
      // compare the password with the saved (encrypted) one
      const validation = await bcrypt.compare(req.body.password, user.password)
      if(!validation) {
        return res.status(400).json({
          'success': false,
          'msg': 'Incorrect username or password.'
        })
      } else {
        // encode token
        const exp = 60 * 60 * 24
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + exp,
          id: user._id,
          username: user.username
        }, privateKey)
        await users.updateOne(
          { _id: user._id },
          {
            $set: {
              isLoggedIn: true
            }
          }
        )
        return res.status(200).json({
          'success': true,
          token,
          exp,
          'msg': `Welcome, ${user.username} ^^.`
        })
      }
    }
  } else {
    // compare the password with the saved (encrypted) one
    const validation = await bcrypt.compare(req.body.password, user.password)
    if(!validation) {
      return res.status(400).json({
        'success': false,
        'msg': 'Incorrect email or password.'
      })
    } else {
      // encode token
      const exp = 60 * 60 * 24
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + exp,
        id: user._id,
        username: user.username
      }, privateKey)
      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            isLoggedIn: true
          }
        }
      )
      return res.status(200).json({
        'success': true,
        token,
        exp,
        'msg': `welcome, ${user.username} ^^.`
      })
    }
  }
})

// get data
router.post('/getUser', upload.none(), async (req, res) => {
  const users = await loadUserCollection();
  const token = req.headers.authorization.split(' ');
  const decoded = jwt.verify(token[1], privateKey);
  const user = await users.findOne({ _id: new ObjectId(decoded.id) })
  const data = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email
  }
  return res.status(200).json({
    'success': true,
    data
  })
})

// logout
router.post('/logout', upload.none(), async (req, res) => {
  const users = await loadUserCollection();
  const token = req.headers.authorization.split(' ');
  const decoded = jwt.verify(token[1], privateKey);
  await users.updateOne(
    { _id: new ObjectId(decoded.id) },
    {
      $set: {
        isLoggedIn: false
      }
    }
  )
  return res.status(200).json({
    'success': true,
    'msg': 'Please come again!'
  })
})

module.exports = router

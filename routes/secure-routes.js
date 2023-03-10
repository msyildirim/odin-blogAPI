const express = require('express');
const router = express.Router();
const path = require('path');

router.get(
  '/profile',
  (req, res, next) => {
    res.json({
      message: 'You made it to the secure route',
      user: req.user,
      token: req.query.secret_token
    })
  }
);

router.get('/newpost', (req, res) => {
    res.sendFile(path.join(__dirname+'/../views/blog_form.html'))
})
    
module.exports = router;
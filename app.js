const express =  require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./model/model');
require('dotenv').config();
mongoose.connect(process.env["MONGO_URI"], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+'/views/index.html'))
// })

// app.get('/api/posts', (req, res) => {
//     console.log("inn")
//     res.json([{title: "t1", content: "c1"}, {title: "t2", content: "c2"}])
// })
// app.get('/newpost', (req, res) => {
//     res.sendFile(path.join(__dirname+'/views/blog_form.html'))
// })

// app.post('/newpost', (req, res) => {
//     res.json({
//         saved: true,
//         content: req.body.content
//     })
// })

app.listen(3000, () => {
    console.log('Server started.')
  });
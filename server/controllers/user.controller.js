const User = require('../models/user');
const passport = require('passport');
const _ = require('lodash');
const userCtrl = {};
const nodemailer = require('nodemailer');
const async = require('async');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.register = async (req, res, next) => {
  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password
  });
  await user.save((err, doc) => {
    if (!err)
      res.send(doc);
    else {
      console.log(err);
      if (err.code == 11000)
        res.status(422).send(['Duplicate email adrress found.']);
      else
        return next(err);
    }
  });
};

userCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

userCtrl.editUser = async (req, res, next) => {
  const { id } = req.params;
  const user = {
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar
  };
  await User.findByIdAndUpdate(id, { $set: user }, { new: true }, (err, doc) => {
    if (!err)
      res.send(doc);
    else {
      console.log(err);
      if (err.code == 11000)
        res.status(422).send(['Duplicate email adrress found.']);
      else
        return next(err);
    }
  });
  res.json({ status: "User updated!" });
}

userCtrl.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate('local', (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user) return res.status(200).json({ "token": user.generateJwt() });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
}

userCtrl.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id },
    (err, user) => {
      if (!user)
        return res.status(404).json({ status: false, message: 'User record not found.' });
      else
        return res.status(200).json({ status: true, user: _.pick(user, ['fullname', 'email', 'avatar', '_id']) });
    }
  );
}

// Forgot password
userCtrl.forgot = (req, res, next) => {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },

    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
          //req.flash('error', 'No account with that email address exists.');//cambiar
          console.log(res);
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function (err) {
          done(err, token, user);
        });
      });
    },

    function (token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'luislira1029@gmail.com',
          pass: 'lovato456/123'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'luislira1029@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + 'http://localhost:4200' + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');//cambiar
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
    console.log(res);
  });
};

userCtrl.reset = (req, res) => {
  async.waterfall([
    function (done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
          return console.log(res);
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function (err) {
          req.logIn(user, function (err) {
            done(err, user);
          });
        });
      });
    },
    function (user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'luislira1029@gmail.com',
          pass: 'lovato456/123'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        //req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function (err) {
    //res.redirect('/');
  });
}

module.exports = userCtrl;
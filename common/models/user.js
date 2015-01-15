'use strict';

var config = require('../../server/config.json');
var emailLocale = require('../../server/locales/email.json');
var path = require('path');

module.exports = function(user) {
  //send verification email after registration
  user.afterRemote( 'create', function(context, user, next ) {
    user.language = !user.language || user.language === ''? 'en' : user.language;
    var toName = !user.username || user.username === ''? user.email : user.username;

    var options = {
      type: 'email',
      to: toName + '<' + user.email + '>',
      name: user.username,
      from: 'js-mean-seed<noreply@js-mean-seed.com>',
      subject: emailLocale[ user.language ].subject,
      template: path.resolve(__dirname, '../../server/' + emailLocale[ user.language ].template ),
      text: emailLocale[ user.language ].plainText,
      redirect: '/verified', 
    };

    user.verify(options, function(err, response) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('> verification email sent');
      next();
    });
  });

  //send password reset link when requested
  user.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' + info.accessToken.id
      + '">here</a> to reset your password';

    user.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
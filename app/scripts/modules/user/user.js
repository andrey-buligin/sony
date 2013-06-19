define([
  'modules/user/models/main',
  'modules/user/views/signin',
  'modules/user/views/signup'
],

function (UserModel, SignInView, SignUpView) {

  "use strict";

  return {
    Views: {
      Signin: SignInView,
      Register:  SignUpView
    },
    Model: UserModel
  };

});

define([
  'scripts/modules/user/models/main',
  'scripts/modules/user/views/signin',
  'scripts/modules/user/views/signup'
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

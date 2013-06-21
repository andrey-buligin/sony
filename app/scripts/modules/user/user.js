define([
    'scripts/modules/user/models/main',
    'scripts/modules/user/models/signup',
    'scripts/modules/user/views/signin',
    'scripts/modules/user/views/signup',
    'scripts/modules/user/views/details'
],

function (UserModel, UserRegisterModel, SignInView, SignUpView, DetailsView) {

    "use strict";

    return {
        Views: {
            Signin   : SignInView,
            Register : SignUpView,
            Welcome  : DetailsView
        },
        Models: {
            Main     : UserModel,
            Register : UserRegisterModel
        }
    };

});

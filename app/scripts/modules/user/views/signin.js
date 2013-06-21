define([
  'hbs!templates/user/signin'
],

function(template) {

  "use strict";

    var SignInView = Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, "login", "loginSuccess", "loginError");
        },

        render: function(){
            this.$el.html(template());
            return this;
        },

        login: function (e) {
            e.preventDefault();

            var email = $.trim(this.$('#login').val()),
                password = $.trim(this.$('#login-password').val());

            if (email && password) {
                this.model.login({
                    email: email,
                    password: password,
                    successCallback: this.loginSuccess,
                    errorCallback: this.loginError
                });
            } else {
                this.showErrorMessage('Please check email and password');
            }
        },

        loginSuccess: function(data, status, jqXHR){
            var self = this;

            // using deferred because if error occurs in success callback it might break some script execution
            this.model.fetch().success(function(){
                Backbone.history.navigate('/#', true);
            }).error(function(data, status, errorMsg){
                self.showErrorMessage('User data fail: ' + errorMsg);
            });
        },

        loginError: function(jqXHR, status, message) {
            var response = $.parseJSON(jqXHR.responseText.replace('msg', '"msg"'));
            this.showErrorMessage(response.msg);
        },

        showErrorMessage: function(message) {
            $('.alert-error').text(message).show();
        },

        events : {
            "click .btn-primary": "login"
        }
    });

    return SignInView;
});


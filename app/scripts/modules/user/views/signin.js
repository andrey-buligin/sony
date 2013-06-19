define([
  'modules/user/models/',
  'hbs!templates/user/signin.html'
],

function(template) {

  "use strict";

    SignInView = BaseView.extend({

        render: function(){
            this.$el.html(template());
        },

        login: function (e) {
            e.preventDefault();

            var email = $('#login-mail').val(),
                password = $('#login-password').val();

            $.ajax({
                url: app.config.API_URL + '/signin/' + email + '/' + password,
                type: 'POST',
                dataType: "json",
                success: function(data, status, jqXHR) {
                    sessionStorage.setItem("sessionId", data);
                    app.session.currentUser = data.userId;
                    app.session.expires = data.expiryTime;
                    Backbone.history.navigate('/', true);
                },
                error: function(data) {
                    console.log(arguments);
                    $('.alert-error').text(data.error.text).show();
                }
            });
        },

        events : {
            "click .btn-primary": "login"
        }
    });

    return SignInView;
});


define([
  'hbs!templates/user/signin'
],

function(template) {

  "use strict";

    var SignInView = Backbone.View.extend({

        render: function(){
            this.$el.html(template());
            return this;
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


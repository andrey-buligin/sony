define([
	'backbone',
	'scripts/modules/user/user'
],

function(Backbone, User) {

	"use strict";

	var Router = Backbone.Router.extend({
        routes: {
            ""              : "home",
            "user/register" : "register",
            "user/profile"  : "profile",
            "user/login"    : "login",
            "titles"        : "titles",
            "titles/:id"    : "titles"
        },

        checkForAuthorisation: function(){
        	console.log('app.session.currentUser', app.session.currentUser);
            if (!sessionStorage.getItem("sessionId") || !app.session.currentUser) {
                Backbone.history.navigate('/user/login', true);
                return false;
            }
            return true;
        },

        home: function() {
            if (this.checkForAuthorisation()) {
                $('#content').empty().append(new User.Views.Welcome({model: app.session.currentUser}).render().el);
            }
        },

        login: function() {
			var user = new User.Models.Main();
            $('#content').empty().append(new User.Views.Signin({model: user}).render().el);
        },

        register: function() {
			var userSignup = new User.Models.Register();
            $('#content').empty().append(new User.Views.Register({model: userSignup}).render().el);
        },

        titles: function(id) {
            if (this.checkForAuthorisation()) {
                require(['scripts/modules/titles/titles'], function(Titles) {
                    alert('titles page to be completed');
                });
            }
        }
    });

	return Router;
});
define([
  'backbone'
],

function(Backbone) {

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
            if (!sessionStorage.getItem("sessionId")) {
            	console.log('force login');
                Backbone.history.navigate('/user/login', true);
            }
            return true;
        },

        home: function() {
            if (this.checkForAuthorisation()) {
                console.log('homepage');
            }
        },

        login: function() {
            require(['scripts/modules/user/user'], function(User) {
                $('#content').empty().append(new User.Views.Signin().render().el);
            });
        },

        register: function() {
            require(['scripts/modules/user/user'], function(User) {
            	console.log('render user');
                $('#content').empty().append(new User.Views.Register().render().el);
            });
        },

        titles: function(id) {
            if (this.checkForAuthorisation()) {
                require(['scripts/modules/titles/titles'], function(Titles) {
                    console.log('titles page');
                });
            }
        }
    });

	return Router;
})
define([
    'backbone'
],

function (Backbone) {

    "use strict";

    var Model = Backbone.Model.extend({

        url: function() {
            return app.config.API_URL + "/profile/" + this.id;
        },

        idAttribute: "userId",

        defaults: {
            "firstName": "",
            "lastName": "",
            "password": "",
            "username": "",
            "phoneNumber": "",
            "age": 18,
            "genderIsFemale": false,
            "notes": null
        },

        validation: {
            username: {
                required: true,
                msg: 'Please enter username'
            },
            password: {
                required: true,
                msg: 'Please enter password'
            },
            firstName: {
                required: true,
                msg: 'Please enter first name'
            },
            lastName: {
                required: true,
                msg: 'Please enter last name'
            },
            age: {
                required: true,
                msg: 'Please enter your age'
            },
            phoneNumber: [{
                required: true,
                msg: 'Please provide your phone'
            },{
                pattern: 'digits',
                msg: 'Phone number provided is not correct'
            }]
        },

        initialize: function() {

        },

        login: function (params) {
            var self = this;

            $.ajax({
                url: app.config.API_URL + '/signin/' + params.email + '/' + params.password,
                type: 'GET',
                dataType: "json",
                success: function(data, status, jqXHR) {
                    self.set(data);
                    sessionStorage.setItem("sessionId", data.sessionId);
                    sessionStorage.setItem("userId", data.userId);
                    app.session.currentUser = self;
                    app.session.expires = data.expiryTime;
                    if (_.isFunction(params.successCallback)) {
                        params.successCallback(data, status, jqXHR);
                    }
                },
                error: params.errorCallback
            });
        }

    });

    return Model;

});

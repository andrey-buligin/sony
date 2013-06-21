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

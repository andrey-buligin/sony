define([
    'backbone'
],

function (Backbone) {

    "use strict";

    var Model = Backbone.Model.extend({

        idAttribute: "username",

        defaults: {
            "firstName"     : "",
            "lastName"      : "",
            "phoneNumber"   : "",
            "password"      : "",
            "username"      : ""
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
            phoneNumber: [{
                required: true,
                msg: 'Please provide your phone'
            },{
                pattern: 'digits',
                msg: 'Phone number provided is not correct'
            }]
        },

        save: function() {
            this.url = app.config.API_URL + "/register/" + this.get('username');
            return Backbone.Model.prototype.save.apply(this, _.toArray(arguments));
        }

    });

    return Model;

});

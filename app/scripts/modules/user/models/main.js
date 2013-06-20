define(function() {

    "use strict";

    var Model = Backbone.Model.extend({

        idAttribute: "userId",

        defaults: {
            "firstName": "",
            "lastName": "testuser",
            "password": "password",
            "username": "alexw",
            "phoneNumber": "0777999666",
            "age": 0,
            "genderIsFemale": false,
            "notes": null
        },

        initialize: function() {

        },

        filterSomething: function() {

        }

    });

    return Model;

});

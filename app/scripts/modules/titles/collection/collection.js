define([
    'helpers/utils/namespace'
],

function (app) {

    "use strict";

    var Collection = Backbone.Collection.extend({

        assignCollection: function () {
            this.each(_.bind(function (model) {
              model.collection = this;
            }, this));
        },

        initialize: function () {
        },

        fetch: function () {
            var dfd = Backbone.Collection.prototype.fetch.apply(this, _.toArray(arguments));

            dfd.then(_.bind(function(resp) {
              // assign the collection to the model
              assignCollection.call(this);
            }, this));

            return dfd;
        }
    });

    return Collection;
});

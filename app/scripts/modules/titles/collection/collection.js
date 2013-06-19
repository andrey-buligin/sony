//
// ## helpers/mvc/collection
//

define([
  'helpers/utils/namespace'
],

function (app) {

  "use strict";

  //
  // used to assign models to collections when they are fetched
  // from the api or fetched from local storage.
  //
  var assignCollection = function () {
    // assign the collection to the model
    this.each(_.bind(function (model) {
      //console.log('COLLECTION added model to collection');
      model.collection = this;

      if (model.dynamicSchema) {
        model.addToSchema();
      }
    }, this));
  },


  //
  // returns the next model in the collection or the
  // first model if it's at the end of the collection
  //
  next = function (model) {
    if (!model) {
      return;
    }

    var index = this.indexOf(model),
        nextModel = this.at(index + 1);

    if (!nextModel) {
      nextModel = this.first();
    }

    return nextModel;
  },


  //
  // returns the previous model in the collection or the
  // last model if it's at the start of the collection.
  //
  previous = function (model) {
    if (!model) {
      return;
    }

    var index = this.indexOf(model),
        nextModel = this.at(index - 1);

    if (!nextModel) {
      nextModel = this.at(this.length - 1);
    }

    return nextModel;
  },



  initialize = function () {
    //
    // events bubble up from the models. so when a model is successfully
    // updated or removed, the collections are notified. they trigger an
    // event which the dataStore uses to clear any collection data in
    // memory or local storage.
    // TODO. Do we still need to use the data store?
    //
    this.on('sync', function () {
      app.get('collection').trigger('sync', this.url);
    });

    this.on('destroy', function () {
      app.get('collection').trigger('destroy', this.url);
    });

    return this;
  },



  fetch = function () {
    var dfd = Backbone.Collection.prototype.fetch.apply(this, _.toArray(arguments));

    dfd.then(_.bind(function(resp) {
      // assign the collection to the model
      assignCollection.call(this);
    }, this));

    return dfd;
  },


  // override the get method of the collection
  get = function (id) {
    id = id instanceof Backbone.Model ? id.get('id') : id;

    return Backbone.Collection.prototype.get.call(this, id);
  },


  //
  // static method of the collection object
  // returns a collection either from the local memory store or a new collection.
  // if an id argument is supplied then the object with the matching id is
  // returned from the collection, rather than the collection
  // you can force a new collection, not from the cache by supplying cached:false
  // in the options
  //
  getFromCache = (function () {
    // stores the collections in local memory
    var collectionStore = {};

    return function (prototype, opts) {
      var Collection, collection, url;

      if (!prototype) {
        throw new app.utils.Error('missing a prototype', 'helpers.mvc.collection',
            'getFromCache');
      }

      Collection = CollectionHelper.extend(prototype);

      // convert urls to use for storing
      url = app.utils.formatUrl(prototype.url);

      // user has requested a non-cached version of the collection, as collections
      // are shared by default, this will return a new instance.
      if (typeof opts !== 'undefined' && ( opts === false || opts.cached === false) ) {
        return new Collection();
      }

      if ( url ) {
        // check local memory for collection
        collection = collectionStore[url];
      }

      // return collection if stored in local memory
      if (collection) {
        return collection;
      }

      // if not, create a new collection and store it.
      if (!collection) {
        collection = new Collection();
        collectionStore[url] = collection;
        return collection;
      }
    };
  }());



  // Exports
  var CollectionHelper = Backbone.Collection.extend({
    initialize       : initialize,
    assignCollection : assignCollection,
    get              : get,
    fetch            : fetch,
    next             : next,
    previous         : previous
  });

  // static method
  CollectionHelper.getFromCache = getFromCache;

  return CollectionHelper;
});

//
// ## helpers/mvc/model
//

define([
  'helpers/utils/namespace',
  'helpers/i18n/locale'
],

function (app, lang) {

  "use strict";

  // regex used for replacing placeholder text in the schema
  var regEx = /\{\{\s*([\w\d\-]+)\s*(uc|lc)?\s*\}\}/,
      localise = app.lang.localise,


  //
  // converts all model date to their correct UTC date time i.e.
  // "2013-05-03T12:08:33+01:00" > "2013-05-03T11:08:42Z"
  //
  convertDates = function () {
    var modelSchema = this.modelSchema, modelAttrs = this.attributes;

    if (!modelSchema || !modelAttrs) {
      return;
    }

    (function convert (mSchema, mAttrs) {
      _.each(mAttrs, function (value, key) {
        // dates using the fixedDate schema type will be ignored
        if (mSchema && mSchema[key] === 'date' && !!value) {
          mAttrs[key] = app.utils.convertDateToUTCString(value);
        }
        if ($.isPlainObject(mAttrs[key])) {
          convert(mSchema[key], mAttrs[key]);
        }
      });
    }(modelSchema, modelAttrs));

    return modelAttrs.date;
  },


  //
  // used when initlialsing new models that don't belong to a collection
  // already. there is also an assignCollection() method in the collection
  // helper which is used to assign models to collections when they are fetched
  // from the api or fetched from local storage.
  //
  assignCollection = function () {
    // assign a collection to the model if it has a collection property
    var collection = this.get('collection');

    // check to make sure it is a collection and not a collection of
    // of something else i.e. array
    if (collection && collection instanceof Backbone.Collection) {
      this.unset('collection', {silent : true});
      this.collection = collection;
      collection.add(this);
    }
  },


  //
  // a model should be accessed via a collection so that when it's
  // updated the collection is also updated and views based on the collection
  // will be updated, but as a backup, in case a model is fetched from the
  // server and not taken from a collection we need to update the model
  // in the collection with data from the fetched model.
  //
  sync = function () {
    // make sure model has a collection
    if (this.collection) {
      // get the model from the collection
      var mod = this.collection.get(this.id);

      if (!mod) {
        this.collection.add(this);
      }

      // check to make sure it's not the same model which is in the collection
      if (mod && mod !== this) {
        // update the model in the collection silently
        console.warn('Model updated outside of collection', mod);
        mod.set(this.attributes, {silent : true});
      }
    }
  },


  //
  // Converts any html into ascii characters to stop script injections
  //
  removeHTML = function () {
    var self = this;

    _.each(this.attributes, function (value, key) {
      if (typeof value === 'string' && /<[^<]+?>/.test(value)) {
        self.set(key, app.utils.htmlEscape(value));
      }
    });
  },


  //
  // override unset so we can reset more than one vlaue at a time by passing in
  // an object.
  //
  //
  unset = function (attr, options) {
    var self = this;

    if (_.isObject(attr)) {
      _.each(attr, function (value, key) {
        Backbone.Model.prototype.unset.call(self, key, options);
      });
      return;
    }

    Backbone.Model.prototype.unset.call(self, attr, options);
  },


  //
  // Shadow the save method
  //
  save = function (key, value, options) {
    // this allows us to make a silent save, so doesn't trigger the 'sync' event
    // when a model is saved as backbone models don't support { silent : true }
    // both of these options work;
    // model.save({silent : true})
    // model.save(null, {silent : true})
    if ($.isPlainObject(key) && key.silent) {
      key = null;
      value = { success : function () {} };
    }
    else if (key === null && $.isPlainObject(value) && value.silent) {
      value.success = function () {};
    }
    else if ($.isPlainObject(value) && value.silent) {
      value.success = function () {};
    }
    else if ($.isPlainObject(options) && options.silent) {
      options.success = function () {};
    }
    // serialise any html
    removeHTML.call(this);
    //convert anty dates
    this.convertDates();
    return Backbone.Model.prototype.save.call(this, key, value, options);
  },


  //
  //
  //
  initialize = function () {
    // needs locale to be accessible
    if (!lang) {
      console.error('ERROR:', 'app.lang is not accessible');
      return;
    }

    // bind and model changes to the sync
    this.bind('sync', sync);

    // TODO: remove this and use 'urlRoot' instead.
    //
    // assign a model to a collection is one has been supplied
    assignCollection.call(this);

    // rewrite the url if one is used in sub class.
    // normally the url is taken from the model's collection
    // but some model's don't have collections i.e. signin
    if (typeof this.url === 'string') {
      this.url = app.config.get('app').get('API_URL') + this.url;
    }

    var locale = lang.get(this.locale);

    if (!locale) {
      return;
    }

    return this;
  },


  validate = function (attrs, options) {
    var self = this, validationRules, validateFields, errors = [];

    attrs = attrs || this.toJSON();
    validationRules = self.validationRules,
    validateFields = attrs.validateFields,
    errors = [];

    if (validationRules) {
      _.each(_.keys(validationRules), function (key) {
        var rulesArray = [];
        if (_.isArray(validationRules[key])) {
          rulesArray = validationRules[key];
        }
        else {
          rulesArray.push(validationRules[key]);
        }

        for(var i = 0; i < rulesArray.length; i++) {
          if (!_.has(attrs,key) || (rulesArray[i] && !_test(rulesArray[i].rule, attrs[key]))) {
            if (!validateFields || validateFields.indexOf(key) !== -1) {
              var msg = localise(rulesArray[i].errorMessage, self.locale, {
                  keyName : rulesArray[i].name ? rulesArray[i].name : key
              });

              errors.push({
                key : key,
                errorInfo : msg
              });
              break;
            }
          }
        }
      });

      if (errors.length > 0) {
        // reverse the array so form validaton ends on the element which is
        // nearest the top of the form. it helps with the tooltips.
        return errors.reverse();
      }
    }
  },


  _test = function(type, value) {
    // TODO these regEx need some work
    var predefinedValidationRules = app.form.getPredefinedValidationRules();

    if (_.has(predefinedValidationRules, type)) {
      if (_.isRegExp(predefinedValidationRules[type])) {
        return predefinedValidationRules[type].test(value);
      }
      if (_.isFunction(predefinedValidationRules[type])) {
        return predefinedValidationRules[type](value);
      }
    }
    return false;
  };


  // Exports
  var Model = Backbone.Model.extend({
    initialize       : initialize,
    save             : save,
    unset            : unset,
    assignCollection : assignCollection,
    convertDates     : convertDates,
    validate         : validate
  });

  // app.namespace.setItem('app.Model', Model);

  return Model;

});

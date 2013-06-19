//
// ## models.user.user
//

define([
  'helpers/utils/namespace',
  'helpers/mvc/model'
],

function (app, ParentModel) {

  "use strict";

  var Model = ParentModel.extend({

    locale : 'user',

    modelSchema : {
      'id'              : 'number',
      'isAdmin'         : 'boolean',
      'saveType' : {
        'id' : 'number'
      },
      'email'           : 'string',
      'firstName'       : 'string',
      'lastName'        : 'string',
      'password'        : 'string',
      'passwordConfirm' : 'string',
      'currentPassword' : 'string'
    },

    validationRules : {
       firstName: [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'max100Rule',
        errorMessage : 'max100'
      }],

      lastName: [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'max100Rule',
        errorMessage : 'max100'
      }],

      email: [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'email',
        errorMessage : 'invalidFormat'
      }],

      currentPassword : {
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },

      passwordNew: [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'min5',
        errorMessage : 'min5'
      },{
        rule         : 'password',
        errorMessage : 'invalidFormat'
      }],

      passwordConfirm: [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'min5',
        errorMessage : 'min5'
      },{
        rule         : 'password',
        errorMessage : 'invalidFormat'
      }]
    },

    initialize : function (options) {
      ParentModel.prototype.initialize.call(this, options);
      this.url = app.config.get('app').get('API_URL') + 'users/currentuser';
    }
  });


  return Model;

});


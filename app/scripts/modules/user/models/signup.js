//
// ## models.user.signup
//

define([
  'helpers/utils/namespace',
  'helpers/mvc/model'
],

function (app, ParentModel) {

  "use strict";

  var Model = ParentModel.extend({

    locale : 'user',

    // the actual model that's being used for comunication with the server
    modelSchema : {
      'firstName':          'string',
      'lastName':           'string',
      'email':              'string',
      'userName':           'string',
      'password':           'string',
      'passwordConfirm':    'string'
    },

    validationRules : {
      'firstName': [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'max100Rule',
        errorMessage : 'max100'
      }],

      'lastName': [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'max100Rule',
        errorMessage : 'max100'
      }],

      'email': [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'email',
        errorMessage : 'invalidFormat'
      }],

      'userName': [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'max100Rule',
        errorMessage : 'max100'
      }],

      'password': [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'min5',
        errorMessage : 'min5'
      },{
        rule         : 'password',
        errorMessage : 'invalidFormat'
      }],

      'passwordConfirm': [{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'min5',
        errorMessage : 'min5'
      },{
        rule         : 'password',
        errorMessage : 'invalidFormat'
      }],
    },

    url: 'security/register'
  });


  return Model;

});

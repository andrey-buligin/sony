//
// ## models.user.reset
//

define([
  'helpers/utils/namespace',
  'helpers/mvc/model'
],

function (app, ParentModel) {

  "use strict";

  var Model = ParentModel.extend({

    locale : 'user',

    validationRules : {
      'email':[{
        rule         : 'notEmpty',
        errorMessage : 'notEmpty'
      },{
        rule         : 'email',
        errorMessage : 'invalidFormat'
      }]
    },

    url: 'security/resetpassword',
  });


  return Model;

});

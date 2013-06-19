//
// ## models.user.success
//

define([
  'helpers/utils/namespace'
],

function (app, ParentModel, forms) {

  "use strict";

  var Model = Backbone.Model.extend({
    url: app.config.get('app').get('API_URL') + 'security/register/confirm'
  });

  return Model;

});

//
// ## views.user.signup/success
//
define([
  'helpers/utils/namespace',
  'helpers/mvc/view'
],

function (app, View) {

  "use strict";

  var ResetView = View.extend({

    locale    : 'user',
    className : 'user',
    uid       : 'signup-success',
    template  : "user/signup/success-template.html",

    // options mapped to 'this' view instance
    options: {},

    render: function (template) {

      var $el = template(this.el, this.options);

      return this;

    }

  });

  return ResetView;

});

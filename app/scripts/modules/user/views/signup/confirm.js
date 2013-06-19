//
// ## views.user.signup/confirm
//
define([
  'helpers/utils/namespace',
  'helpers/mvc/view',
  'text!templates/user/signup/confirm-template.html'
],

function (app, BaseView, htmlTemplate) {

  "use strict";

  return function (viewArgs) {
    var self = null, opts,

    View = BaseView.extend({

      locale         : 'user',
      className      : 'user',
      htmlTemplate   : htmlTemplate,
      uid            : 'signup-confirm',
      options        : {},


      initialize     : function () {
        this.options.data = app.sessionStorage.getItem('signup');
        BaseView.prototype.initialize.apply(this, _.toArray(arguments));
      },

      render         : function (template) {
        template(this.el, this.options);

        return this;
      }

    });

    _.extend(this, new View(viewArgs));
    self = this;
    opts = self.options;

    return self;

  };

});

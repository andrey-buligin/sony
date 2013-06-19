//
// ## views.user.signup.main
//

define([
  'helpers/utils/namespace',
  'helpers/mvc/view',
  'text!templates/user/signup/main-template.html'
],

function(app, BaseView, htmlTemplate) {

  "use strict";

  return function (viewArgs) {
    var self = null,
        opts, $alert, $els, $name,

    initialize = function() {
      BaseView.prototype.initialize.apply(this, _.toArray(arguments));
      // remove and existing sessionStorage entries for
      // the signup page
      app.sessionStorage.removeItem('signup');
    },


    _save = function (e) {
      app.form.submit(e, this.$el, this.model, {
        validationSuccessCb : function (data) {
          app.sessionStorage.setItem('signup', self.model.toJSON());
          $name.removeClass('error');
          app.get('signup').trigger('confirm', this.model);
        },
        validationErrorCb : _checkNameFields
      });
    },


    //
    // check the firstName and lastName fields and if they are in a valid state
    // remove the error class from the 'name' form label. we use a timeout to
    // make sure the logic is actioned last
    //
    _checkNameFields = function (e) {
      setTimeout(function () {
        var count = 0;

        self.$('[id$="firstName"], [id$="lastName"]').each(function (i, el) {
          if ($(el).closest('.control-group.error')[0]) {
            count++;
          }
        });

        if (!count) {
          $name.removeClass('error');
        } else {
          $name.addClass('error');
        }
      }, 10);
    },


    render = function(template) {
      template(self.el, opts, function ($el) {
        $name = self.$('.control-label[for="signup-name"]');

        app.form.initialise($el, self.model, {
          keyupValidationAfterSubmit : true,
          validateBeforeSubmit : ['email', 'password', 'passwordConfirm'],
          validateOnLoad : false,
          validationErrorCb : _checkNameFields
        });
      }, self.$el);
    },

    View = BaseView.extend({
      locale        : 'user',
      className     : 'user',
      uid           : 'signup-form',
      htmlTemplate  : htmlTemplate,
      render        : render,
      initialize    : initialize,
      events        : {
        'click .btn-primary' : _save,
        'keyup input[id$="firstName"]' : _checkNameFields,
        'keyup input[id$="lastName"]'  : _checkNameFields
      }
    });

    _.extend(this, new View(viewArgs));
    self = this;
    opts = self.options;

    return self;

  };

});


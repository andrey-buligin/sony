define([
  'hbs!templates/user/signup/main-template',
  'hbs!templates/user/signup/success-template',
  'backboneValidationBootstrap',
  'backboneStickIt'
],

function(template, successTpl, BackboneValidation) {

  "use strict";

    var RegisterView = Backbone.View.extend({

        template: template,
        className: 'signup-form',

        events : {
            "click .btn-primary": "register"
        },

        /**************************** MODEL-VIEW BINDINGS *******************************/

        bindings: {
            'input#firstName'   : 'firstName',
            'input#lastName'    : 'lastName',
            'input#phoneNumber' : 'phoneNumber',
            'input#username'    : 'username',
            'input#password'    : 'password'
        },

        initialize: function() {
            _.bindAll(this, 'register', 'showError', 'showSuccesScreen');
        },

        render: function(){
            var self = this;

            this.$el.html(this.template());
            Backbone.Validation.bind(this, {
                selector: 'id'
            });
            this.stickit();

            this.model.on('change', function(){
                self.model.validate();
            });
            this.model.on('validated:valid', function(){
                if (self.passwordMatch()) {
                    self.$('.alert-error').hide();
                }
            });

            return this;
        },

        register: function (e) {
            var self = this;

            e.preventDefault();

            if ( this.model.isValid(true)) {
                if ( !this.passwordMatch() ) {
                    this.showError("Password doesn't match");
                } else {
                    this.model.save(null, {
                        success: function(model, data){
                            self.showSuccesScreen();
                        },
                        error: function(model, jqXHR) {
                            var response = $.parseJSON(jqXHR.responseText.replace('msg', '"msg"'));
                            self.showError(response.msg);
                        }
                    });
                }
            }
        },

        passwordMatch: function() {
            return this.$('#password').val() === this.$('#passwordConfirm').val();
        },

        showSuccesScreen: function(){
            this.$el.html(successTpl(this.model.toJSON()));
        },

        showError: function(msg) {
            this.$('.alert-error').text(msg).fadeIn();
        }

    });

    return RegisterView;
});
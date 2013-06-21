define([
  'scripts/modules/user/views/signup',
  'hbs!templates/user/details'
],

function(BaseView, template) {

  "use strict";

    var DetailsView = BaseView.extend({

        template: template,
        events : {
            "click .btn-primary": "update"
        },

        /**************************** MODEL-VIEW BINDINGS *******************************/

        bindings: {
            'input#firstName'   : 'firstName',
            'input#lastName'    : 'lastName',
            'input#phoneNumber' : 'phoneNumber',
            'input#username'    : 'username',
            'input#password'    : 'password',
            'input#age'         : 'age',
            'input#gender'      : 'gender',
            'textarea#note'     : 'note'
        },

        initialize: function() {
            _.bindAll(this, 'update');
            BaseView.prototype.initialize.apply(this, _.toArray(arguments));
        },

        render: function(){
            BaseView.prototype.render.call(this, this.options);
            return this;
        },

        update: function (e) {
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

        showSuccesScreen: function(){
            this.$('.alert-success').fadeIn();
        }

    });

    return DetailsView;
});
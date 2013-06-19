//
// ## views.user.settings.main
//
define([
  'helpers/utils/namespace',
  'helpers/mvc/view',
  'views/user/settings/email',
  'views/user/settings/name',
  'views/user/settings/password',
  'modal',
  'tab'
],

function (app, BaseView, EmailView, NameView, PasswordView) {

  "use strict";

  return function (viewArgs) {
    var self = null, opts,

    _cancelDetails = function (e) {
      e.preventDefault();

      self.$('.modal').modal('hide');
      app.get('navigation').trigger('change');
    },


    _tabClick = function (e) {
      var $el = $(e.target), view;

      self.$('.alert').addClass('hide');

      // stop action if tab is already active
      if ($el.closest('li.active')[0]) {
        return;
      }

      $el.closest('.modal-body')
        .find('.active')
        .removeClass('active')
      .end()
        .find("#" + $el.attr('id') +'.tab-pane')
        .addClass('active');

      var currentTab = self.$('.tab-pane').index(self.$('.tab-pane.active')),
          tabs = _.values(self.tabs);

      if (_.isFunction(tabs[currentTab].clear)) {
        tabs[currentTab].clear();
      }
    },


    _save = function(e) {
      var currentTab = self.$('.tab-pane').index(self.$('.tab-pane.active'));
      _.values(self.tabs)[currentTab].save(e);
    },



    _prepareNav = function () {
      // get elements cached
      var nav = self.$('.nav'),
          $legends = self.$('fieldset > legend'),
          $modal = self.$('.modal'),
          navItems = [];

      // creating navigation items
      $legends.each(function (index, el) {
        var $el = $(el),
            $text = $el.text().toLowerCase().replace(' ', '-');

        $el.addClass('hide');
        $el.closest('.tab-pane').attr({'id' : $text});
        navItems.push("<a id=" + $text + " data-toggle=tab>" + $(el).text() +
            "</a>");
        //add class to form div actions here
        $el.closest('form').find('.form-actions').addClass('modal-footer');
      });

      // appending navItems
      _.each(navItems, function (el) {
        $(nav).append($('<li>' + el + '</li>'));
      });

      // setting up tabs
      $(nav).find('a:first').tab('show');
      $modal.modal('show');
    },


    render = function (template) {
      template(self.el, opts);

      var size = null,

      options = {
        model : this.model,
        $saveBtn : self.$('.btn-primary')
      },

      tabs = self.tabs = {
        nameView     : new NameView(options),
        emailView    : new EmailView(options),
        passwordView : new PasswordView(options)
      };

      this.model.fetch({silent:true}).success(function(data) {
        self.$('.modal-body').removeClass('hide');
        self.$('[id$=name-form]').append(tabs.nameView.renderView().el);
        self.$('[id$=email-form]').append(tabs.emailView.renderView().el);
        self.$('[id$=password-form]').append(tabs.passwordView.renderView().el);

        size = _.size(self.tabs);

        (function f() {
          var nav = self.$el.find('legend').length;

          if (nav < size) {
            setTimeout(f, 9);
            return;
          }

          _prepareNav.call(self);
        }());
      });
    },



    View = BaseView.extend({
      locale    : 'user',
      className : 'user-settings-form',
      uid       : 'user-settings',
      template  : "user/settings/main-template.html",
      render     : render,

      events: {
        "click .nav a"           : _tabClick,
        "click .cancel-settings" : _cancelDetails,
        "click .btn-primary"     : _save
      },
    });

    _.extend(this, new View(viewArgs));
    self = this;
    opts = self.options;

    return self;
  };

});

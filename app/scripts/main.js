/*global require*/
'use strict';

require.config({
    //dir: "./",
    baseUrl: "./",
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '&'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        json2 : '../bower_components/require-handlebars-plugin/hbs/json2',
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars'
    },
    hbs : {
        templateExtension : 'html',
        disableI18n: true
    }
});

require([
    'backbone',
    'jquery',
    'scripts/router'
], function (Backbone, $, Router) {

    var app = window.app = {
        config: {
            API_URL: 'http://217.18.25.29:10070/'
        },
        session: {
            currentUser: null,
            sessionId: null
        }
    };

    $.ajaxSetup({
        statusCode: {
            404: function(){
                window.location.replace('/#user/login');
            },
            403: function() {
                window.location.replace('/#user/login');
            }
        },
        beforeSend : function(jqXHR, request) {
          var header,
              token = app.session.sessionId || 'INVALID';

          if (request.url.indexOf('signin') === 0 ) { //&& request.type === 'POST'
            jqXHR.setRequestHeader('sessionId', header);
          }
        }
    });

    //TODO
    // USER - register, sign in, details
    // TITLES - view, add/remove
    // TITLES - full list

    var appRouter = new Router();
    Backbone.history.start();

});
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
        backboneStickIt: {
            deps: ['backbone']
        },
        backboneValidationBootstrap: {
            deps: ['backbone', 'backboneValidation']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        json2 : '../bower_components/require-handlebars-plugin/hbs/json2',
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',
        backboneStickIt: 'scripts/vendor/backbone/backbone.stickit',
        backboneValidation: 'scripts/vendor/backbone/backbone.validation',
        backboneValidationBootstrap: 'scripts/vendor/backbone/backbone.validation.bootstrap'
    },
    hbs : {
        templateExtension : 'html',
        disableI18n: true
    }
});

require([
    'backbone',
    'scripts/config',
    'scripts/router'
], function (Backbone, config, Router) {

    var appRouter = new Router();
    Backbone.history.start();

});
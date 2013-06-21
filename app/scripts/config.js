require([
    'jquery'
],

function ($) {

	"use strict";

	// setting up ajax calls.
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
        	var sessionId = sessionStorage.getItem("sessionId");
        	console.log('before send', sessionId);
	        if ( sessionId ) {
	        	jqXHR.setRequestHeader('sessionId', sessionId);
	        }
        }
    });

    var app = window.app = {
        config: {
            API_URL: 'http://217.18.25.29:10070'
        },
        session: {
            currentUser: null,
            sessionId: null
        }
    };

    return app;
});
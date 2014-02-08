requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout-2.3.0.debug',
        'jquery': '../bower_components/jquery/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'modernizr': '../bower_components/modernizr/modernizr',
        underscore: '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'knockback': '../bower_components/knockback/knockback'
    },
    shim: {
    bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
    modernizr: {
            exports: 'Modernizr'
        },
    backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
});

define(['durandal/system', 
    'durandal/app', 
    'durandal/viewLocator', 
    'backbone',
    'knockout',
    'bootstrap'],  function (system, app, viewLocator, backbone,ko) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "Todo App";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });
    
    var ENTER_KEY = 13;

	// a custom binding to handle the enter key (could go in a separate library)
	ko.bindingHandlers.enterKey = {
	    init: function( element, valueAccessor, allBindingsAccessor, data ) {
	        var wrappedHandler, newValueAccessor;
	
	        // wrap the handler with a check for the enter key
	        wrappedHandler = function( data, event ) {
	            if ( event.keyCode === ENTER_KEY ) {
	                valueAccessor().call( this, data, event );
	            }
	        };
	
	        // create a valueAccessor with the options that we would want to pass to the event binding
	        newValueAccessor = function() {
	            return {
	                keyup: wrappedHandler
	            };
	        };
	
	        // call the real event binding's init function
	        ko.bindingHandlers.event.init( element, newValueAccessor, allBindingsAccessor, data );
	    }
	};

    (function() {
      var proxiedSync = backbone.sync;
      backbone.sync = function(method, model, options) {
        options || (options = {});
        if (!options.crossDomain) {
          options.crossDomain = true;
        }
        if (!options.xhrFields) {
          options.xhrFields = {withCredentials:true};
        }
        return proxiedSync(method, model, options);
      };
    })();

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});
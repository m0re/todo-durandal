/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TodoModel = Backbone.Model.extend({
    	urlRoot :  "http://localhost:8080/todo-server/todo",
        defaults: {
        }
    });

    return TodoModel;
});

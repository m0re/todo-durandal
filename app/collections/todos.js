/*global define*/

define([
    'underscore',
    'backbone',
    'models/todo'
], function (_, Backbone, TodoModel) {
    'use strict';

    var TodoCollection = Backbone.Collection.extend({
        model: TodoModel,
        url:"http://localhost:8080/todo-server/todo"
    });

    return TodoCollection;
});

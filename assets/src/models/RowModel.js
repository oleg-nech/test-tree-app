/*global Backbone, module*/
"use strict";

module.exports = Backbone.Model.extend({
    defaults: {
        title: '',
        depth: 1,
        children: [],
        open: false
    }
});
/*global Marionette, require, module*/
"use strict";

let TreeView = require('./TreeView'),
    SubRowView = require('./SubRowView');

module.exports = TreeView.extend({
    template: '#subtree-tpl',
    childView: SubRowView,

    initialize(){
        this._initialize();
    },

    onDestroy(){}
});
/*global Marionette, require, module, App, _*/
"use strict";

let RowView = require('./RowView');

module.exports = Marionette.CompositeView.extend({
    template: '#tree-tpl',
    childView: RowView,
    childViewContainer: 'ul',
    ui: {
        saveBtn: '.save',
        loadBtn: '.load'
    },
    events: {
        'click @ui.saveBtn': 'saveTree',
        'click @ui.loadBtn': 'loadTree'
    },

    initialize() {
        App.on('tree:refresh', _.bind(this.render, this));
        this._initialize();
    },
    onDestroy(){
        App.off('tree:refresh');
    },

    saveTree(){
        if (supportsStorage()) {
            // save
        }
    },

    loadTree(){
        if (supportsStorage()) {
            // load
        }
    },

    _initialize(){
        this.on('itemview:collection:changed', _.bind(this.render, this));
    }
});
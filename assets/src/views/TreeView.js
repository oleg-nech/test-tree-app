/*global Marionette, require, module, App, _*/
"use strict";

let RowView = require('./RowView');

module.exports = Marionette.CompositeView.extend({
    template: '#tree-tpl',
    childView: RowView,
    childViewContainer: 'ul',
    ui: {
        saveBtn: '.save'
    },
    events: {
        'click @ui.saveBtn': 'saveTree'
    },
    collectionEvents: {
	    'update': 'collectionChanged',
	    'change:children': 'collectionChanged'
    },

    initialize () {
        App.on('tree:refresh', _.bind(this.render, this));
        this._initialize();
    },

    onDestroy () {
        App.off('tree:refresh');
    },

    /**
     * Save tree to localeStorage
     */
    saveTree () {
        if (supportsStorage()) {
            localStorage.setItem('tree', JSON.stringify(this.collection.toJSON()));
        }
    },

    /**
     * Trigger event to update whole collection
     */
    collectionChanged () {
        this.triggerMethod('treeview:collection:changed', this.collection);
    },

    /**
     * Refresh view when collection was changed
     * @private
     */
    _initialize () {
        this.on('itemview:collection:changed', _.bind(this.render, this));
    }
});

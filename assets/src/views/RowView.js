/*global Marionette, module, $, App*/
"use strict";

module.exports = Marionette.ItemView.extend({
    template: '#tree-element-tpl',
    className: 'list-group-item',
    tagName: 'li',

    ui: {
        text: '.text',
        addNext: '.add-next',
        addChildren: '.add-children',
        remove: '.remove',
        open: '.tree-open',
        close: '.tree-close'
    },

    events: {
        'click @ui.remove': 'removeRow',
        'click @ui.addNext': 'addNext',
        'click @ui.addChildren': 'addChildren',
        'click @ui.open': 'openTree',
        'click @ui.close': 'closeTree'
    },

    /**
     * Event is called when view is rendered
     */
    onRender(){
        let children = this.model.get('children'),
            depth = this.model.get('depth');

        if (children !== undefined && children !== null && children.length) {
            this._renderChildren(children);
        }

        this.ui.text.css({
            paddingLeft: (depth * 30) + 'px'
        });
    },

    /**
     * User click on remove item button
     * @param {event} e
     */
    removeRow(e){
        e.stopPropagation();

        let message = "Delete it?";
        if (this.model.get('children').length) {
            message += ' All children will be deleted too!';
        }

        if (window.confirm(message)) {
            this.model.destroy();
            this.destroy();
        }
    },

    /**
     * User click on "add next" button
     * @param {event} e
     */
    addNext(e){
        e.stopPropagation();

        this._askForTitle().then((title) => {
            let next = this.model.collection.indexOf(this.model) + 1;

            this.model.collection.add({
                title: title,
                depth: this.model.get('depth')
            }, {at: next});
            this.trigger('collection:changed');
        });
    },

    /**
     * User click on "add children" button
     * @param {event} e
     */
    addChildren(e){
        e.stopPropagation();

        this._askForTitle().then((title) => {
            let children = [{
                title: title,
                depth: this.model.get('depth') + 1
            }];

            this.model.set({children: children});
            this.render();
        });
    },

    /**
     * Open collapsed tree
     */
    openTree: function() {
        this.$el.find('.sub-list-group:first').show();
        this.ui.open.hide();
        this.ui.close.show();
    },

    /**
     * Collapse tree
     */
    closeTree: function() {
        this.$el.find('.sub-list-group:first').hide();
        this.ui.open.show();
        this.ui.close.hide();
    },

    /**
     * Render children
     * @param {Array} children
     * @private
     */
    _renderChildren(children){
        let TreeCollection = require('../collections/TreeCollection'),
            SubtreeView = require('./SubtreeView'),
            depth = this.model.get('depth'),
            tree = new TreeCollection(children).setDepth(depth + 1),
            view = new SubtreeView({
                collection: tree
            });

        this.$el.append(view.render().$el);

        if (!this.model.get('open')) {
            view.$el.find('.sub-list-group').hide();
        }
    },

    /**
     * Ask user to enter title
     * @returns {Promise}
     * @private
     */
    _askForTitle(){
        return new Promise((resolve, reject) => {
            resolve(window.prompt('Enter title:'));
        });
    }
});
/*global Marionette, require, module, App, _, $*/
"use strict";

let TreeCollection = require('../collections/TreeCollection'),
    TreeView = require('../views/TreeView'),
    IterativeView = require('../views/IterativeView');

module.exports = {
    /**
     * Recursive tree
     */
    recursive(){
        let treeView = new TreeView({
            collection: this.getTree()
        });
        App.mainRegion.show(treeView);
    },

    /**
     * Iterative tree message
     */
    iterative () {
        App.mainRegion.show(
            new IterativeView()
        );
    },

    /**
     * Get tree
     * If tree was saved in localeStorage, load it
     * Else create default tree
     * @returns {TreeCollection}
     */
    getTree () {
        let tree = localStorage.getItem('tree');

        if (tree !== null && tree !== undefined) {
            tree = JSON.parse(tree);
        } else {
            tree = [
                {title: 'first'},
                {
                    title: 'second',
                    children: [
                        {title: 'first 2'},
                        {
                            title: 'second 2',
                            children: [
                                {title: 'first 3'},
                                {title: 'second 3'},
                                {title: 'third 3'}
                            ]
                        },
                        {title: 'third 2'}
                    ]
                },
                {title: 'third'}
            ];
        }

        return new TreeCollection(tree);
    }
};

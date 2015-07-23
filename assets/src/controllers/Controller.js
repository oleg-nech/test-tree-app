/*global Marionette, require, module, App, _, $*/
"use strict";

let TreeCollection = require('../collections/TreeCollection'),
    TreeView = require('../views/TreeView');

module.exports = {
    recursive(){
        App.mainRegion.show(
            new TreeView({
                collection: this.getTree()
            })
        );
    },
    iterative(){
        App.mainRegion.empty();
    },
    getTree(){
        return new TreeCollection([
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
        ]);
    }
};
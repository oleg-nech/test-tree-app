/*global Backbone, require, module*/
"use strict";

let RowModel = require('../models/RowModel');

module.exports = Backbone.Collection.extend({
    model: RowModel,

    /**
     * Set depth for all collection elements (except children)
     * @param {number} depth
     */
    setDepth(depth) {
        this.each((item) => {
            item.set({depth: depth});
        });

        return this;
    }
});
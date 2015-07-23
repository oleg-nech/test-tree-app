/*global Marionette, require, module, App, _, $*/
"use strict";

module.exports = Marionette.AppRouter.extend({
    appRoutes: {
        "": "recursive",
        "iterative": "iterative"
    }
});
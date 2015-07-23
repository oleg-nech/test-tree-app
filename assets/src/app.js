/*global module, Marionette, require, Backbone*/
"use strict";

window.App = new Marionette.Application();

let Router = require('./routers/Router.js'),
    Controller = require('./controllers/Controller.js');

App.addRegions({
    mainRegion: '#mainRegion'
});

App.addInitializer(() => {
    new Router({
        controller: Controller
    });
});

App.on('start', () => {
    if(Backbone.history) {
        Backbone.history.start({});
    }

    let MenuView = require('./views/MenuView'),
        menu = new MenuView();
    menu.render();
});

module.exports = App;

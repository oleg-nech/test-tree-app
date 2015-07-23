/*global require, window*/
"use strict";

require("babelify/polyfill");

// shortcut function for console.log
window._log = (text) => console.log(text);

window.supportsStorage = () => {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
};

window.App = require('./app');
    
App.start();
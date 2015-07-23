/*global Marionette, require, module, App, _, $*/
"use strict";

module.exports = Marionette.ItemView.extend({
    el: '.navbar-nav',
    template: false,
    ui: {
        item: 'a'
    },
    events: {
        'click @ui.item': 'clickItem'
    },
    clickItem(e){
        let $target = $(e.target),
            $li = $(e.target).closest('li');

        if (!$li.hasClass('active')) {
            this.$el.find('.active').removeClass('active');
            $li.addClass('active');
        }
    }
});
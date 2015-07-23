(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global Backbone, require, module*/
"use strict";

var RowModel = require('../models/RowModel');

module.exports = Backbone.Collection.extend({
    model: RowModel,

    /**
     * Set depth for all collection elements (except children)
     * @param {number} depth
     */
    setDepth: function setDepth(depth) {
        this.each(function (item) {
            item.set({ depth: depth });
        });

        return this;
    }
});

},{"../models/RowModel":2}],2:[function(require,module,exports){
/*global Backbone, module*/
"use strict";

module.exports = Backbone.Model.extend({
    defaults: {
        title: '',
        depth: 1,
        children: [],
        open: false
    }
});

},{}],3:[function(require,module,exports){
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
    clickItem: function clickItem(e) {
        var $target = $(e.target),
            $li = $(e.target).closest('li');

        if (!$li.hasClass('active')) {
            this.$el.find('.active').removeClass('active');
            $li.addClass('active');
        }
    }
});

},{}],4:[function(require,module,exports){
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
    onRender: function onRender() {
        var children = this.model.get('children'),
            depth = this.model.get('depth');

        if (children !== undefined && children !== null && children.length) {
            this._renderChildren(children);
        }

        this.ui.text.css({
            paddingLeft: depth * 30 + 'px'
        });
    },

    /**
     * User click on remove item button
     * @param {event} e
     */
    removeRow: function removeRow(e) {
        e.stopPropagation();

        var message = "Delete it?";
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
    addNext: function addNext(e) {
        var _this = this;

        e.stopPropagation();

        this._askForTitle().then(function (title) {
            var next = _this.model.collection.indexOf(_this.model) + 1;

            _this.model.collection.add({
                title: title,
                depth: _this.model.get('depth')
            }, { at: next });
            _this.trigger('collection:changed');
        });
    },

    /**
     * User click on "add children" button
     * @param {event} e
     */
    addChildren: function addChildren(e) {
        var _this2 = this;

        e.stopPropagation();

        this._askForTitle().then(function (title) {
            var children = [{
                title: title,
                depth: _this2.model.get('depth') + 1
            }];

            _this2.model.set({ children: children });
            _this2.render();
        });
    },

    /**
     * Open collapsed tree
     */
    openTree: function openTree() {
        this.$el.find('.sub-list-group:first').show();
        this.ui.open.hide();
        this.ui.close.show();
    },

    /**
     * Collapse tree
     */
    closeTree: function closeTree() {
        this.$el.find('.sub-list-group:first').hide();
        this.ui.open.show();
        this.ui.close.hide();
    },

    /**
     * Render children
     * @param {Array} children
     * @private
     */
    _renderChildren: function _renderChildren(children) {
        var TreeCollection = require('../collections/TreeCollection'),
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
    _askForTitle: function _askForTitle() {
        return new Promise(function (resolve, reject) {
            resolve(window.prompt('Enter title:'));
        });
    }
});

},{"../collections/TreeCollection":1,"./SubtreeView":6}],5:[function(require,module,exports){
/*global Marionette, module, $, App*/
"use strict";

var RowView = require('./RowView');

module.exports = RowView.extend({
    className: ''
});

},{"./RowView":4}],6:[function(require,module,exports){
/*global Marionette, require, module*/
"use strict";

var TreeView = require('./TreeView'),
    SubRowView = require('./SubRowView');

module.exports = TreeView.extend({
    template: '#subtree-tpl',
    childView: SubRowView,
    initialize: function initialize() {
        this._initialize();
    },
    onDestroy: function onDestroy() {}
});

},{"./SubRowView":5,"./TreeView":7}],7:[function(require,module,exports){
/*global Marionette, require, module, App, _*/
"use strict";

var RowView = require('./RowView');

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

    initialize: function initialize() {
        App.on('tree:refresh', _.bind(this.render, this));
        this._initialize();
    },
    onDestroy: function onDestroy() {
        App.off('tree:refresh');
    },

    saveTree: function saveTree() {
        if (supportsStorage()) {
            // save
        }
    },

    loadTree: function loadTree() {
        if (supportsStorage()) {
            // load
        }
    },

    _initialize: function _initialize() {
        this.on('itemview:collection:changed', _.bind(this.render, this));
    }
});

},{"./RowView":4}],8:[function(require,module,exports){
"use strict";

describe("app.js", function () {
    describe("App object", function () {
        it("App is global obejct", function () {
            expect(App).to.be.an("object");
        });
    });
});

},{}],9:[function(require,module,exports){
"use strict";

var TreeCollection = require('../../src/collections/TreeCollection');

describe("collections.TreeCollection", function () {
    describe("setDepth()", function () {
        it("method exists", function () {
            var collection = new TreeCollection([{ name: "row1" }, { name: "row2" }]);
            collection.setDepth(2);
            expect(collection.pluck('depth')).to.deep.equal([2, 2]);
        });
    });
});

},{"../../src/collections/TreeCollection":1}],10:[function(require,module,exports){
'use strict';

require('./app');
require('./collections/TreeCollection');
require('./models/RowModel');
require('./views/MenuView');
require('./views/RowView');

},{"./app":8,"./collections/TreeCollection":9,"./models/RowModel":11,"./views/MenuView":12,"./views/RowView":13}],11:[function(require,module,exports){
"use strict";

var RowModel = require('../../src/models/RowModel');

describe("models.RowModel", function () {
    describe("defaults", function () {
        it("all default fields are set", function () {
            var model = new RowModel({});
            expect(model.get('title')).to.equal('');
            expect(model.get('depth')).to.equal(1);
            expect(model.get('children')).to.deep.equal([]);
            expect(model.get('open')).to.be["false"];
        });
    });
});

},{"../../src/models/RowModel":2}],12:[function(require,module,exports){
"use strict";

var MenuView = require('../../src/views/MenuView');

describe("views.MenuView", function () {
    describe("clickItem", function () {
        it("when clicking item it should change active elemtn", function () {
            $('#content').html('<ul class="navbar-nav"><li id="el1"><a>el1</a></li><li id="el2"><a>el2</a></li></ul>');
            var view = new MenuView();

            expect($('#content li.active').length).to.equal(0);

            $('#content #el1 a').trigger('click');
            expect($('#content li.active').length).to.equal(1);
            expect($('#content #el1').hasClass('active')).to.be["true"];

            $('#content #el2 a').trigger('click');
            expect($('#content li.active').length).to.equal(1);
            expect($('#content #el2').hasClass('active')).to.be["true"];
        });
    });
});

},{"../../src/views/MenuView":3}],13:[function(require,module,exports){
'use strict';

var RowView = require('../../src/views/RowView'),
    RowModel = require('../../src/models/RowModel');

function render() {
    var model = new RowModel({
        title: 'root',
        children: [{ title: 'child1' }, { title: 'child2' }]
    }),
        view = new RowView({
        model: model
    });

    $('#content').html(view.render().$el);
}

describe("views.RowView", function () {
    function render() {
        var model = new RowModel({
            title: 'root',
            children: [{ title: 'child1' }, { title: 'child2' }]
        }),
            view = new RowView({
            model: model
        });

        $('#content').html(view.render().$el);
    }

    describe("onRender", function () {
        it("should render recursively children", function () {
            render();

            var li = $('#content li');
            expect(li.length).to.equal(3);
            expect($('#content ul').length).to.equal(1);
            expect(li.eq(0).find('.text').css('paddingLeft')).to.equal('30px');
            expect(li.eq(1).find('.text').css('paddingLeft')).to.equal('60px');
        });
    });

    describe("removeRow", function () {
        it("should remove row", function () {
            render();
            var confirmStub = sinon.stub(window, 'confirm');
            confirmStub.returns(true);

            $('#content .remove:first').trigger('click');
            expect($('#content li').length).to.equal(0);
            confirmStub.restore();
        });
    });
});

},{"../../src/models/RowModel":2,"../../src/views/RowView":4}]},{},[10]);

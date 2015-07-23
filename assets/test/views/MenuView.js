const MenuView = require('../../src/views/MenuView');

describe("views.MenuView", () => {
    describe("clickItem", () => {
        it("when clicking item it should change active elemtn", () => {
	    $('#content').html('<ul class="navbar-nav"><li id="el1"><a>el1</a></li><li id="el2"><a>el2</a></li></ul>');
	    let view = new MenuView();

            expect($('#content li.active').length).to.equal(0);

	    $('#content #el1 a').trigger('click');
	    expect($('#content li.active').length).to.equal(1);
	    expect($('#content #el1').hasClass('active')).to.be.true;

	    $('#content #el2 a').trigger('click');
            expect($('#content li.active').length).to.equal(1);
            expect($('#content #el2').hasClass('active')).to.be.true;

        });
    });
});


/*global describe, it, require*/

const RowView = require('../../src/views/RowView'),
    TreeCollection = require('../../src/collections/TreeCollection');

describe("views.RowView", () => {
    function render(){
        let collection = new TreeCollection([{
                title: 'root',
                children: [
                    {title: 'child1'},
                    {title: 'child2'}
                ]
            }]),
            view = new RowView({
                model: collection.at(0)
            });

       $('#content').html(view.render().$el);
    }

    describe("onRender", () => {
        it("should render recursively children", () => {
            render();

            let li = $('#content li');
            expect(li.length).to.equal(3);
            expect($('#content ul').length).to.equal(1);
            expect(li.eq(0).find('.text').css('paddingLeft')).to.equal('30px');
            expect(li.eq(1).find('.text').css('paddingLeft')).to.equal('60px');
        });
    });

    describe("removeRow", () => {
        it("should remove row", () => {
            render();

            let confirmStub = sinon.stub(window, 'confirm');
            confirmStub.returns(true);

	        $('#content .remove:first').trigger('click');
            expect($('#content li').length).to.equal(0);
            confirmStub.restore();
        });
    });
});


/*global describe, it, require*/
const RowModel = require('../../src/models/RowModel');

describe("models.RowModel", () => {
    describe("defaults", () => {
        it("all default fields are set", () => {
            let model = new RowModel({});

            expect(model.get('title')).to.equal('');
            expect(model.get('depth')).to.equal(1);
            expect(model.get('children')).to.deep.equal([]);
            expect(model.get('open')).to.be.false;
        });
    });
});


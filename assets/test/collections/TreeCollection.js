/*global describe, it, require*/
const TreeCollection = require('../../src/collections/TreeCollection');

describe("collections.TreeCollection", () => {
    describe("setDepth()", () => {
        it("method exists", () => {
            let collection = new TreeCollection([{name:"row1"}, {name:"row2"}]);
            collection.setDepth(2);
            expect(collection.pluck('depth')).to.deep.equal([2, 2]);
        });
    });
});


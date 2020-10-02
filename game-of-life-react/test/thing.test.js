let chai = require('chai');

describe('Cell', () => {
    let cell;

    describe('when created', () => {

        it('should take living state in the constructor', () => {
            cell = new Cell(true);

            cell.alive.should.equal(true);
        });
    });
});
let chai = require('chai');
chai.should();

let Cell = require('../src/game-logic/Cell');

describe('Cell', () => {
    let cell;

    describe('when created', () => {

        it('should take living state in the constructor', () => {
            cell = new Cell(true);
            cell.alive.should.equal(true);

            cell = new Cell(false);
            cell.alive.should.equal(false);
        });
    });
});
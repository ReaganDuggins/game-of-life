let chai = require('chai');
chai.should();

const Cell = require('../src/game-logic/Cell');
const Rules = require('../src/game-logic/Rules');

describe('Rules', () => {
    let noLivingNeighbors = [
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
    ];
    let notEnoughLivingNeighbors = [
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(true),
        new Cell(false),
        new Cell(false),
        new Cell(false),
    ];
    let twoLivingNeighbors = [
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(true),
        new Cell(false),
        new Cell(true),
    ];
    let threeLivingNeighbors = [
        new Cell(true),
        new Cell(true),
        new Cell(true),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
        new Cell(false),
    ];
    let tooManyLivingNeighbors = [
        new Cell(false),
        new Cell(true),
        new Cell(true),
        new Cell(false),
        new Cell(false),
        new Cell(true),
        new Cell(false),
        new Cell(true),
    ];
    let wayTooManyLivingNeighbors = [
        new Cell(true),
        new Cell(true),
        new Cell(true),
        new Cell(true),
        new Cell(true),
        new Cell(true),
        new Cell(true),
        new Cell(true),
    ];


    describe('Underpopulation', () => {

        describe('when a there are too few neighbors ', () => {
            it('should die', () => {
                Rules.survivesThisGeneration(new Cell(true), noLivingNeighbors).should.equal(false);
                Rules.survivesThisGeneration(new Cell(true), notEnoughLivingNeighbors).should.equal(false);
            });
        });

        describe('when there are too many neighbors ', () => {
            it('should die', () => {
                Rules.survivesThisGeneration(new Cell(true), tooManyLivingNeighbors).should.equal(false);
                Rules.survivesThisGeneration(new Cell(true), wayTooManyLivingNeighbors).should.equal(false);
            });
        });

        describe('when there are exactly 3 neighbors ', () => {
            it('should become or stay alive', () => {
                Rules.survivesThisGeneration(new Cell(true), threeLivingNeighbors).should.equal(true);
                Rules.survivesThisGeneration(new Cell(false), threeLivingNeighbors).should.equal(true);
            });
        });

        describe('when there are exactly 2 neighbors ', () => {
            it('should not change its state', () => {
                Rules.survivesThisGeneration(new Cell(true), twoLivingNeighbors).should.equal(true);
                Rules.survivesThisGeneration(new Cell(false), twoLivingNeighbors).should.equal(false);
            });
        });
        
    });
});
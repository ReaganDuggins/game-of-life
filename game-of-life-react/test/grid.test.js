let chai = require('chai');
let should = chai.should();

let Grid = require('../src/game-logic/Grid');

describe('Grid', () => {
    let grid;

    describe('when created', () => {
        
        beforeEach(() => {
            grid = new Grid(5);
        });

        it('should take size in the constructor', () => {
            grid.size.should.equal(5);
        });

        it('should have a cells list', () => {
            should.exist(grid.cells);
            grid.cells.should.be.a('array');
        });

        describe('when provided with a list of living cells', () => {
            describe('and the list is undefined', () => {

                it('should initialize all cells as dead', () => {
                    grid = new Grid(5);

                    grid.cells.length.should.equal(5);
                    grid.cells[0].length.should.equal(5);

                    grid.cells.forEach((row) => {
                        row.forEach((cell) => {
                            should.exist(cell);
                            cell.alive.should.equal(false);
                        })
                    })
                });
            });

            describe('and the list is empty', () => {
                it('should initialize all cells as dead', () => {
                    grid = new Grid(5, []);

                    grid.cells.length.should.equal(5);
                    grid.cells[0].length.should.equal(5);
                    
                    grid.cells.forEach((row) => {
                        row.forEach((cell) => {
                            should.exist(cell);
                            cell.alive.should.equal(false);
                        })
                    })
                });
            });

            describe('and the list contains cell coordinates', () => {
                
                it('should initialize a specified cell as alive', () => {
                    grid = new Grid(5, [{row: 2, col: 4}]);

                    grid.cells.length.should.equal(5);
                    grid.cells[0].length.should.equal(5);
                    
                    grid.cells[2][4].alive.should.equal(true);
                });

                xdescribe('but the list contains bad coordinates', () => {
                    it('should ignore the bad coordinates', () => {
                        grid = new Grid(5, [
                            {row: 10, col: 4}, 
                            {row: 0, col: -12},
                        ]);
    
                        grid.cells.length.should.equal(5);
                        grid.cells[0].length.should.equal(5);
                        
                        grid.cells[2][4].alive.should.equal(true);
                    });
                })
            });
        });
    });
});
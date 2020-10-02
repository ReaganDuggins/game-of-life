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
                        });
                    });
                });
            });

            describe('and the list contains cell coordinates', () => {
                
                it('should initialize a specified cell as alive', () => {
                    grid = new Grid(5, [{row: 2, col: 4}]);

                    grid.cells.length.should.equal(5);
                    grid.cells[0].length.should.equal(5);
                    
                    grid.cells[2][4].alive.should.equal(true);
                });

                describe('but the list contains bad coordinates', () => {
                    it('should ignore the bad coordinates', () => {
                        grid = new Grid(5, [
                            {row: 10, col: 4}, 
                            {row: 0, col: -12},
                        ]);

                        grid.cells.forEach((row) => {
                            row.forEach((cell) => {
                                should.exist(cell);
                                cell.alive.should.equal(false);
                            });
                        });
                    });
                })
            });
        });
    });
    
    describe('findNeighbors()', () => {
        describe('should gather all of the neighbors when', () => {
            it('has no neighbors', () => {
                grid = new Grid(1);
                let found = grid.findNeighbors({row: 0, col: 0});
                found.length.should.equal(0);
            });

            it('has some neighbors', () => {
                grid = new Grid(2);
                let found = grid.findNeighbors({row: 0, col: 0});
                found.length.should.equal(3);

                grid = new Grid(2);
                found = grid.findNeighbors({row: 1, col: 1});
                found.length.should.equal(3);

                grid = new Grid(3);
                found = grid.findNeighbors({row: 0, col: 1});
                found.length.should.equal(5);
            });

            it('has all neighbors', () => {
                grid = new Grid(3);
                let found = grid.findNeighbors({row: 1, col: 1});
                found.length.should.equal(8);
            });
        });
    });

    describe('liveOrDie()', () => {

        beforeEach(() => {
            grid = new Grid(5,[
                {row: 0, col: 3},
                {row: 0, col: 4},
                {row: 1, col: 0},
                {row: 1, col: 1},
                {row: 1, col: 3},
                {row: 1, col: 4},
                {row: 2, col: 0},
                {row: 2, col: 4},
                {row: 4, col: 0},
                {row: 4, col: 2},
                {row: 4, col: 3},

            ]);
        });

        describe('when a live cell is underpopulated', () =>{
            it('should die', () => {
                let cellCoord = {row: 4, col: 0};
                let newCell = grid.liveOrDie(cellCoord);

                newCell.alive.should.equal(false);

                cellCoord = {row: 4, col: 2};
                newCell = grid.liveOrDie(cellCoord);

                newCell.alive.should.equal(false);
            });
        });

        describe('when a live cell is overpopulated', () =>{
            it('should die', () => {
                let cellCoord = {row: 1, col: 3};
                let newCell = grid.liveOrDie(cellCoord);

                newCell.alive.should.equal(false);

                cellCoord = {row: 1, col: 4};
                newCell = grid.liveOrDie(cellCoord);

                newCell.alive.should.equal(false);
            });
        });

        describe('when a cell is perfectly populated', () =>{
            it('should live if dead', () => {
                let deadCoord = {row: 2, col: 1};
                let newCell = grid.liveOrDie(deadCoord);

                newCell.alive.should.equal(true);
            });

            it('should live if alive', () => {
                let liveCoord = {row: 1, col: 2};
                let newCell = grid.liveOrDie(liveCoord);

                newCell.alive.should.equal(true);
            });
        });

        describe('when a cell is barely populated', () =>{
            it('should live if alive', () => {
                let deadCoord = {row: 1, col: 0};
                let newCell = grid.liveOrDie(deadCoord);

                newCell.alive.should.equal(true);
            });

            it('should die if dead', () => {
                let liveCoord = {row: 4, col: 1};
                let newCell = grid.liveOrDie(liveCoord);

                newCell.alive.should.equal(false);
            });
        });
    });
});
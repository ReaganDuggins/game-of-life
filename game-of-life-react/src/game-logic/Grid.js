const Cell = require("./Cell");

class Grid {
    constructor(size, livingCells) {
        this.size = size;
        this.cells = [];

        this.fillWithDeadCells();
        this.makeCellsLive(livingCells);
    }

    fillWithDeadCells = () => {
        for(let x = 0; x < this.size; x++) {
            let row = [];
            for(let y = 0; y < this.size; y++) {
                row.push(new Cell(false));
            }
            this.cells.push(row);
        }
    }

    makeCellsLive = (livingCells) => {
        if(!livingCells) {
            return;
        }

        livingCells.forEach((coordinate) => {
            if(this.isInGrid(coordinate)){
                this.cellAt(coordinate).alive = true;
            }
        });
    }

    isAlive = (coordinate) => {
        let cell = this.cellAt(coordinate);
        if(!cell) {
            return null;
        }
        return cell.alive;
    }

    cellAt = (coordinate) => {
        if(!this.isInGrid(coordinate)) {
            return null;
        }
        return this.cells[coordinate.row][coordinate.col];
    }

    isInGrid = (coordinate) => {
        return this.cells[coordinate.row] && this.cells[coordinate.row][coordinate.col]
    }
}

module.exports = Grid;
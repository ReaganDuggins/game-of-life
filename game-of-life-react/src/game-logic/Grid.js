const Cell = require("./Cell");
const Rules = require("./Rules");

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

    liveOrDie = (coordinate) => {
        let newCell = new Cell(false);

        newCell.alive = Rules.survivesThisGeneration(this.cellAt(coordinate), this.findNeighbors(coordinate));

        return newCell;
    }

    findNeighbors = (coordinate) => {
        let neighbors = [];
        for(let curRow = coordinate.row - 1; curRow <= coordinate.row + 1; curRow++) {
            for(let curCol = coordinate.col - 1; curCol <= coordinate.col + 1; curCol++) {
                if(curCol === coordinate.col && curRow == coordinate.row) {
                    continue;
                }

                let curCoord = {row: curRow, col: curCol};
                if(this.isInGrid(curCoord)) {
                    neighbors.push(this.cellAt(curCoord))
                }
            }
        }

        return neighbors;
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
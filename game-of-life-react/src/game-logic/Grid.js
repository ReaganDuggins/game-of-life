const Cell = require("./Cell");

class Grid {
    constructor(size, livingCells) {
        this.size = size;

        this.cells = [];

        this.generateCells(livingCells);
    }

    generateCells = (livingCells) => {
        for(let i = 0; i < this.size; i++) {
            let row = [];
            for(let j = 0; j < this.size; j++) {
                row.push(new Cell(false));
            }
            this.cells.push(row);
        }
        
        if(livingCells){    
            livingCells.forEach((coordinate) => {
                this.cells[coordinate.row][coordinate.col].alive = true;
            });
        }
    }
}

module.exports = Grid;
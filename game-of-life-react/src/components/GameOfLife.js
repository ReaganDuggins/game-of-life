import React, {Component} from 'react';
import Grid from '../game-logic/Grid';

export default class GameOfLife extends Component {
    constructor(props) {
        super(props);

        let initialGrid = new Grid(10, [
            {
                row: 5,
                col: 5
            },
            {
                row: 5,
                col: 6
            },
            {
                row: 5,
                col: 7
            },
            {
                row: 6,
                col: 5
            },
            {
                row: 6,
                col: 6
            },
            {
                row: 6,
                col: 7
            },
            {
                row: 6,
                col: 8
            },
        ]);

        this.state = {
            alreadyGoing: false,
            startStopText: 'Start',
            gridSize: 10,
            speed: 1,
            previousGrid: null,
            grid: initialGrid,
            speedOptions: [
                1000,
                500,
                250,
                200,
                150,
                100,
                50
            ]
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if(this.state.alreadyGoing) {
                let newCells = this.state.grid.nextGeneration();
                let newGrid = this.state.grid;
                newGrid.cells = newCells;
                this.setState({
                    grid: newGrid
                });
            }
        }, (this.state.speedOptions[1]));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    showGrid = () => {
        return <table className="grid-holder">
            <tbody className="grid">
                {
                    this.state.grid.cells.map((curRow, rowNum) => {
                        return (
                            <tr className="cell-row">
                                {this.showRow(curRow, rowNum)}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    }

    showRow = (row, rowNum) => {
        return row.map((curCell, colNum) => {
            return (
                <td className={this.cellType(curCell)} onClick={() => {this.clickCell(rowNum, colNum)}}>
                </td>
            )
        });
    }

    cellType = (cell) => {
        if(cell.alive) {
            return "live-cell";
        }
        return "dead-cell";
    }

    clickCell = (rowNum, colNum) => {
        if(this.state.alreadyGoing) {
            return;
        }

        let newGrid = this.state.grid;
        newGrid.cells[rowNum][colNum].alive = !newGrid.cells[rowNum][colNum].alive;
        this.setState({
            grid: newGrid
        });
    }

    startStopGenerations = () => {
        let stillGoing = !this.state.alreadyGoing;
        let newStartStopText = '';
        if(stillGoing) {
            newStartStopText = 'Stop';
            
            this.setState({
                previousGrid: this.state.grid.cloneCells()
            });
        }else {
            newStartStopText = 'Start';
            let newGrid = this.state.grid;
            newGrid.cells = this.state.previousGrid;
            this.setState({
                grid: newGrid
            });
        }
        this.setState({
            alreadyGoing: stillGoing,
            startStopText: newStartStopText
        });
    }

    sizeChange = (event) => {
        let newSize = event.target.value;
        let oldGrid = this.state.grid.cells;
        let living = [];

        oldGrid.forEach((curRow, rowNum) => {
            curRow.forEach((curCol, colNum) => {
                if(oldGrid[rowNum][colNum].alive) {
                    living.push({row: rowNum, col: colNum});
                }
            });
        });

        let newGrid = new Grid(newSize, living);

        this.setState({
            grid: newGrid,
            gridSize: newSize
        });
    }

    speedChange = (event) => {
        let newSpeed = event.target.value;

        clearInterval(this.interval);

        this.interval = setInterval(() => {
            if(this.state.alreadyGoing) {
                let newCells = this.state.grid.nextGeneration();
                let newGrid = this.state.grid;
                newGrid.cells = newCells;
                this.setState({
                    grid: newGrid
                });
            }
        }, (this.state.speedOptions[newSpeed]));

        this.setState({
            speed: newSpeed
        });
    }

    clearCells = () => {
        let newGrid = new Grid(this.state.gridSize);
        this.setState({
            grid: newGrid
        });
    }

    render() {
        return (
            <section className="grid-holder-ultimate">
                {this.showGrid()}
                <button id="start-stop-button" onClick={this.startStopGenerations}>{this.state.startStopText}</button>
                <span id="size-input-holder">
                    <label htmlFor={'size-input'}>Grid Size</label>
                    <input id="size-input" type="number" min="2" max="41" onChange={this.sizeChange} value={this.state.gridSize}></input>
                </span>
                <span id="size-input-holder">
                    <label htmlFor={'speed-input'}>Generation Speed</label>
                    <input id="speed-input" type="number" min="0" max="6" onChange={this.speedChange} value={this.state.speed}></input>
                </span>
                <section>
                    <button id="clear-button" onClick={this.clearCells}>Clear</button>
                </section>
                
            </section>
        );
    }
}
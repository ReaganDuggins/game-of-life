import React, {Component} from 'react';
import Grid from '../game-logic/Grid';

export default class GameOfLife extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadyGoing: false,
            startStopText: 'Start',
            grid: new Grid(10, [
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
            ])
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
        }, 500);
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
        }else {
            newStartStopText = 'Start';
        }
        this.setState({
            alreadyGoing: stillGoing,
            startStopText: newStartStopText
        });
    }

    render() {
        return (
            <section className="grid-holder-ultimate">
                {this.showGrid()}
                <button onClick={this.startStopGenerations}>{this.state.startStopText}</button>
            </section>
        );
    }
}
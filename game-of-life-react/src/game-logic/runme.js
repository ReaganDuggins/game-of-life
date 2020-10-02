let Grid = require('./Grid');

let grid = new Grid(10, [
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

async function go() {
    let generation = 0;
    console.log("GENERATION " + generation + "\n--------------------------------\n\n");
    console.log(grid.toString());
    await sleep(2000);

    while(!grid.completelyDead()) {
        generation++;
        grid.nextGeneration();
        console.log("GENERATION " + generation + "\n--------------------------------\n\n");
        console.log(grid.toString());
        await sleep(1000);
    }
}

go();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
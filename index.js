const { Engine, Render, Runner, Bodies, Composite } = Matter;

// create engine
const engine = Engine.create();
const world = engine.world;

var height = 600;
var width = 600;
const cells = 3;
// create render
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
        height: height,
        width:width
    }
});
Render.run(render);

// create runner
const runner = Runner.create();
Runner.run(runner, engine);


// add bodies
    // add boxes

    // add walls
const wall1 = Bodies.rectangle(width/2, 0, width, 40, { isStatic: true });
const wall2 = Bodies.rectangle(width/2, height, width, 40, { isStatic: true });
const wall3 = Bodies.rectangle(0, height/2, 40, height, { isStatic: true });
const wall4 = Bodies.rectangle(width, height/2, 40, height, { isStatic: true });
Composite.add(engine.world, [wall1,wall2,wall3,wall4]);

// generate maze
const shuffle = (arr) => {
    let counter = arr.length;
    while (counter > 0) {
        const index = Math.floor(Math.random() * counter);
        counter--;

        const temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    };
    return arr;
};

const grid = Array(cells)
    .fill(null)
    .map(() => { Array(cells).fill(false) });

const verticals = Array(cells)
    .fill(null)
    .map(() => { Array(cells-1).fill(false) });

const horizontals = Array(cells-1)
    .fill(null)
    .map(() => { Array(cells).fill(false) });

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const throughCell = (row, column) => {
    // if we have visited the cell at[row,col],return
    if (grid[row][column]) {
        return;
    };
    // mark this cell as being visited
    gird[row][column] = true;
    
    // assemble randomly-ordered list of neighbors
    const neighbors = shuffle([
        [row - 1, column,'up'],
        [row, column + 1,'right'],
        [row + 1, column,'down'],
        [row, column - 1,'left']
    ]);

    // for each neighbor
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn,direction] = neighbor;
    
        // see if thar neighbor is out of bounds
        if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
            continue;
        }

        // if we have visited that neighbor,continue the next neighbor
        if (grid[nextRow][nextColumn]) {
            continue;
        }
        // remove a wall from either horizontal or vertical
        if (direction === 'left') {
            verticals[row][column - 1] = true;
        } else if (direction === 'right') {
            verticals[row][column] = true;
        } else if (direction === 'up') {
            horizontals[row - 1][column] = true;
        } else if (direction === 'down') {
            horizontals[row][column] = true;
        }
    }
    // visit the next cell
    throughCell(startRow, startColumn);
};
throughCell(startRow, startColumn);

horizontals.forEach(row => {
    row.forEach((open) => {
        if (open) {
            return;
        }
        const wall = Bodies.rectangle();
    })
})
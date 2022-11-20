const information = document.getElementById('info')
const field = document.querySelector('.field')
const cellSize = 100;
const empty = {
    top: 0,
    left: 0,
};

const cellPlaces = [];

const level_map = {
    cell_a: [2, 7, 10, 19, 24],
    cell_b: [0, 4, 9, 15, 17],
    cell_c: [5, 12, 14, 20, 22],
    block: [1, 3, 11, 13, 21, 23],
    empty: [6, 8, 16, 18]
}

for (let i = 0; i < 25; i++){
    const cell = document.createElement('div')
    let cell_type = findCellType(i);
    cell.className = cell_type;
    cell.id = `${i}`;
    cell.style.zIndex = "2";

    const left = i % 5;
    const top = (i - left) / 5;
    // console.log(`for ${i} left=${left} top=${top}`)
    function SetInitialPos(cell){
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    }
    SetInitialPos(cell);

    cellPlaces.push({
        left: left,
        top: top,
        element: cell,
    });


    if (cell_type === 'cell_a' || 'cell_b' || 'cell_c') {
        const empty_cell = document.createElement('div');
        empty_cell.className = 'empty';
        empty_cell.style.zIndex = '1';
        SetInitialPos(empty_cell);
        field.append(empty_cell);

    }


    const colour_a = document.createElement('div')
    colour_a.className = 'cell_a'
    colour_a.style.left = `${0 * cellSize}px`;
    colour_a.style.top = `${-1 * cellSize - 20}px`;
    field.append(colour_a)

    const colour_b = document.createElement('div')
    colour_b.className = 'cell_b'
    colour_b.style.left = `${2 * cellSize}px`;
    colour_b.style.top = `${-1 * cellSize - 20}px`;
    field.append(colour_b)

    const colour_c = document.createElement('div')
    colour_c.className = 'cell_c'
    colour_c.style.left = `${4 * cellSize}px`;
    colour_c.style.top = `${-1 * cellSize - 20}px`;
    field.append(colour_c)

    field.append(cell)


}


function findCellType(number){
    if (level_map.cell_a.includes(number)){
        return "cell_a";
    }
    else if(level_map.cell_b.includes(number)){
        return "cell_b";
    }
    else if(level_map.cell_c.includes(number)){
        return "cell_c";
    }
    else if(level_map.block.includes(number)){
        return "block";
    }
    else{
        return "empty";
    }
}
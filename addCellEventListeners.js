const cells = document.querySelectorAll('.cell_a, .cell_b, .cell_c')

cells.forEach(cell => {
    cell.onmousedown = function (event) {

        let distance = 0;
        let shiftX = event.clientX - cell.getBoundingClientRect().left;
        let shiftY = event.clientY - cell.getBoundingClientRect().top;
        cell.style.zIndex = '100';

        document.body.append(cell);

        function moveAt(PageX, PageY) {
            cell.style.left = PageX - shiftX + 'px';
            cell.style.top = PageY - shiftY + 'px';
        }

        moveAt(event.pageX, event.pageY);

        let currentDroppable = null;

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            cell.hidden = true;
            let elemBelow = document.elementsFromPoint(event.clientX,event.clientY);
            cell.hidden = false;
            if (!elemBelow) return;


            let droppableBelow = elemBelow[1];
            distance = findDistance(cell, droppableBelow);
            if (!isSuitable()){
                droppableBelow = null
            }


            function isSuitable() {
                return (droppableBelow.className === "empty") && isSuitableDistance(distance);
            }

            if ( (currentDroppable !== droppableBelow) ) {

                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;

                if (currentDroppable) {
                    enterDroppable(currentDroppable);
                }
            }


        }

        document.addEventListener('mousemove', onMouseMove);

        cell.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            cell.onmouseup = null;

            if (currentDroppable){
                move(cell, currentDroppable);
                leaveDroppable(currentDroppable)
                currentDroppable = null
                let isWin = cellPlaces.every(WinCell);
                if (isWin){
                    alert("CONGRATS!!!!YOU WON!!!YEEEEEEEESSSS!!!!!!!!!I AM SO PROUD OF YOU!!!!!!!!")
                }
            }
            else{
                field.append(cell);
                cell.style.zIndex = '2';
                cell.style.left = `${cellPlaces[cell.id].left * cellSize}px`;
                cell.style.top = `${cellPlaces[cell.id].top * cellSize}px`;

            }

        };

        cell.ondragstart = function () {
            return false;
        };


    };
})

function WinCell(element, index, array){
    switch(element.element.className){
        case 'cell_a':
            return element.left === 0;
        case 'cell_b':
            return element.left === 2;
        case 'cell_c':
            return element.left === 4;
        default:
            return true;
    }
}

function findDistance(start_cell,finish_cell){
    if (finish_cell.id === ""){
        return
    }
    let start = start_cell.id;
    let finish = finish_cell.id;

    const leftDiff = Math.abs(cellPlaces[start].left - cellPlaces[finish].left);
    const topDiff = Math.abs(cellPlaces[start].top - cellPlaces[finish].top);
    return leftDiff + topDiff;
}


function move(start, finish){
    // console.log(start)
    // console.log(finish)
    field.append(start);
    start.style.zIndex = '2';
    // start.position = 'relative'
    let left = cellPlaces[finish.id].left
    let top = cellPlaces[finish.id].top

    cellPlaces[finish.id].left = cellPlaces[start.id].left;
    cellPlaces[finish.id].top = cellPlaces[start.id].top;

    cellPlaces[start.id].left = left;
    cellPlaces[start.id].top = top;

    finish.style.left = `${cellPlaces[finish.id].left * cellSize}px`;
    finish.style.top = `${cellPlaces[finish.id].top * cellSize}px`;

    start.style.left =`${cellPlaces[start.id].left * cellSize}px`
    start.style.top = `${cellPlaces[start.id].top * cellSize}px`



    // console.log('move it')
    // console.log(finish)
    // console.log(start)

}

function isSuitableDistance(dist){
    return (dist < 2) && (dist !== 0)
}

function enterDroppable(elem) {
    elem.style.background = 'pink';
    // elem.style.borderColor = 'pink';
}

function leaveDroppable(elem) {
    elem.style.background = '';
}
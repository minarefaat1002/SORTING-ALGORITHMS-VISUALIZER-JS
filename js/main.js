var numberOfColumns = 40;
var columns = document.getElementById("columns");
var randomize = document.getElementById("randomize");
var speedInput = document.getElementById("speed");
var speed = speedInput.value;
var isRunning = false;
var bars;
var sortingAlgrorithms = [bubbleSort, selectionSort, insertionSort, quickSort, mergeSort]
var sortingBtns = [...document.querySelectorAll('.sorting-btn')];

sortingBtns[0].addEventListener('click', async function() {
    isRunning = true;
    disableBtns();
    await bubbleSort();
    enableBtns();
    isRunning = false;
})

sortingBtns[1].addEventListener('click', async function() {
    isRunning = true;
    disableBtns();
    await selectionSort();
    enableBtns();
    isRunning = false;
})

sortingBtns[2].addEventListener('click', async function() {
    isRunning = true;
    disableBtns();
    await insertionSort();
    enableBtns();
    isRunning = false;
})


sortingBtns[3].addEventListener('click', async function() {
    isRunning = true;
    disableBtns();
    await quickSort(0, bars.length - 1);
    enableBtns();
    isRunning = false;
})


sortingBtns[4].addEventListener('click', async function() {
    isRunning = true;
    disableBtns();
    document.getElementById("merge").style.height = '220px';
    await mergeSort([...bars], 0, bars.length - 1);
    enableBtns();
    isRunning = false;
    document.getElementById("merge").innerHTML = "";
})


function disableBtns() {
    sortingBtns.forEach(btn => {
        btn.disabled = true;
    })
}

function enableBtns() {
    sortingBtns.forEach(btn => {
        btn.disabled = false;
    })
}


speedInput.addEventListener("change", e => {
    speed = 200 - Math.ceil(e.target.value);
});
var bars;
randomize.addEventListener("click", async(event) => {
    numberOfColumns = columns.value;
    isRunning = false;
    await sleep(200);
    generateBars();
    document.getElementById("merge").innerHTML = "";
})

function generateBars() {
    bars = [];
    document.getElementById("bars").innerHTML = "";
    for (let i = 0; i < numberOfColumns; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${Math.floor(Math.random() * 200)}px`;
        bars.push(bar);
        document.getElementById("bars").append(bar);
    }
}

const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

generateBars();

//Bubble sort algorithm
async function bubbleSort() {
    for (let i = 0; i < numberOfColumns - 1; i++) {
        for (let j = 0; j < numberOfColumns - i - 1; j++) {
            if (!isRunning) {
                return;
            }
            height1 = bars[j].style.height;
            height2 = bars[j + 1].style.height;
            bars[j].style.backgroundColor = "white";
            bars[j + 1].style.backgroundColor = "red";
            await sleep(speed);
            if (parseInt(height1) > parseInt(height2)) {
                bars[j].style.backgroundColor = "red";
                bars[j].style.height = height2;
                bars[j + 1].style.backgroundColor = "white";
                bars[j + 1].style.height = height1;
            }
            await sleep(speed);
            bars[j].style.backgroundColor = "#0075ff";
            bars[j + 1].style.backgroundColor = "#0075ff";
        }
        bars[numberOfColumns - i - 1].style.backgroundColor = "rgb(68 255 0)";
    }
    bars[0].style.backgroundColor = "rgb(68 255 0)";
}


//SelectoinS ort algorithm
async function selectionSort() {
    for (let i = numberOfColumns - 1; i >= 0; i--) {
        if (!isRunning) return
        maxIndex = i;
        bars[maxIndex].style.backgroundColor = "white";
        maxHeight = bars[maxIndex].style.height;
        for (let j = i - 1; j >= 0; j--) {
            if (!isRunning) {
                return;
            }
            bars[j].style.backgroundColor = "red";
            curHeight = bars[j].style.height;
            if (parseInt(curHeight) > parseInt(maxHeight)) {
                maxHeight = curHeight;
                maxIndex = j;
            }
            await sleep(speed);
            bars[j].style.backgroundColor = "#0075ff";
        }
        bars[maxIndex].style.height = bars[i].style.height;
        bars[maxIndex].style.backgroundColor = "white";
        bars[i].style.height = maxHeight;
        bars[i].style.backgroundColor = "red"
        await sleep(speed);
        bars[maxIndex].style.backgroundColor = "#0075ff";
        bars[i].style.backgroundColor = "rgb(68 255 0)";
    }
}


//Insertion sort algorithm
async function insertionSort() {
    bars[bars.length - 1].style.backgroundColor = "rgb(68 255 0)";
    for (let i = numberOfColumns - 2; i >= 0; i--) {
        if (!isRunning) return
        height = bars[i].style.height;
        hole = i;
        while (hole < numberOfColumns - 1 && parseInt(bars[hole + 1].style.height) < parseInt(height)) {
            if (!isRunning) return
            curHeight = bars[hole + 1].style.height;
            bars[hole].style.backgroundColor = "white";
            bars[hole + 1].style.backgroundColor = "red";
            await sleep(speed);
            bars[hole].style.backgroundColor = "red";
            bars[hole].style.height = curHeight;
            bars[hole + 1].style.backgroundColor = "white";
            bars[hole + 1].style.height = height;
            await sleep(speed);
            bars[hole].style.backgroundColor = "rgb(68 255 0)";
            hole++;
        }
        bars[hole].style.backgroundColor = "rgb(68 255 0)";
        bars[hole].style.height = height;
    }
}


// QuickSort algorithm 
async function partition(low, high) {
    pivotHeight = bars[high].style.height;
    bars[high].style.backgroundColor = "red";
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (!isRunning) return
        bars[i + 1].style.backgroundColor = "yellow";
        bars[j].style.backgroundColor = "white";
        await sleep(speed);
        if (parseInt(bars[j].style.height) <= parseInt(pivotHeight)) {
            i = i + 1;
            heightI = bars[i].style.height;
            bars[i].style.backgroundColor = "white";
            bars[i].style.height = bars[j].style.height;
            bars[j].style.backgroundColor = "yellow";
            bars[j].style.height = heightI;
            await sleep(speed);
            bars[i].style.backgroundColor = "#0075ff";
        } else {
            bars[i + 1].style.backgroundColor = "#0075ff";
        }
        bars[j].style.backgroundColor = "#0075ff"
    }
    bars[high].style.height = bars[i + 1].style.height;
    bars[high].style.backgroundColor = "#0075ff";
    bars[i + 1].style.height = pivotHeight;
    bars[i + 1].style.backgroundColor = "rgb(68 255 0)";
    return i + 1
}

async function quickSort(low, high) {
    if (low <= high) {
        pi = await partition(low, high);
        await quickSort(low, pi - 1);
        if (!isRunning) return
        await quickSort(pi + 1, high);
    }
}



//MergeSort algorithm
async function merge(left, right, low, high) {
    arrSorted = []
    leftBars = []
    rightBars = []
    document.getElementById("merge").innerHTML = "";
    for (let i = 0; i < low; i++) {
        if (!isRunning) return
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = "1px";
        bar.style.width = bars[0].style.width;
        bar.style.visibility = "hidden";
        document.getElementById("merge").append(bar);
    }
    for (let i = 0; i < left.length; i++) {
        if (!isRunning) return
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = left[i];
        document.getElementById("merge").append(bar);
        leftBars.push(bar);
    }
    for (let i = 0; i < right.length; i++) {
        if (!isRunning) return
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = right[i];
        document.getElementById("merge").append(bar);
        rightBars.push(bar);
    }
    for (let i = 0; i < numberOfColumns - high - 1; i++) {
        if (!isRunning) return
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = "1px";
        bar.style.width = bars[0].style.width;
        bar.style.visibility = "hidden";
        document.getElementById("merge").append(bar);
    }
    l = 0;
    r = 0;
    first = low;
    while (left.length && right.length) {
        if (!isRunning) return
        leftBars[l].style.backgroundColor = "red";
        rightBars[r].style.backgroundColor = "yellow";
        // Insert the smallest item into sortedArr
        await sleep(speed);
        if (parseInt(left[0]) < parseInt(right[0])) {
            ele = left.shift();
            bars[low].style.backgroundColor = "red";
            leftBars[l++].style.backgroundColor = "#0075ff";
            bars[low].style.height = ele;
            arrSorted.push(ele);
        } else {
            ele = right.shift();
            bars[low].style.backgroundColor = "yellow";
            rightBars[r++].style.backgroundColor = "#0075ff";
            bars[low].style.height = ele;
            arrSorted.push(ele);
        }
        await sleep(speed);
        bars[low].style.backgroundColor = "#0075ff";
        low = low + 1;
    }
    while (left.length) {
        if (!isRunning) return
        ele = left.shift();
        bars[low].style.backgroundColor = "red";
        leftBars[l++].style.backgroundColor = "#0075ff";
        arrSorted.push(ele)
        bars[low].style.height = ele;
        await sleep(speed);
        bars[low].style.backgroundColor = "#0075ff";
        low = low + 1;
    }
    while (right.length) {
        if (!isRunning) return
        ele = right.shift();
        bars[low].style.backgroundColor = "yellow";
        rightBars[r++].style.backgroundColor = "#0075ff";
        arrSorted.push(ele)
        bars[low].style.height = ele;
        await sleep(speed);
        bars[low].style.backgroundColor = "#0075ff";
        low = low + 1;
    }
    for (let i = 0; i < leftBars.length + rightBars.length; i++) {
        bars[first + i].style.backgroundColor = "rgb(68 255 0)";
        await sleep(speed);
    }
    return arrSorted
}


async function mergeSort(arr, low, high) {
    // Base case
    if (arr.length == 1) return [arr[0].style.height]
    else if (arr.length < 1) return arr
    let mid = Math.floor((high + low) / 2);
    bars[mid].style.backgroundColor = "white";
    await sleep(speed);
    bars[mid].style.backgroundColor = "#0075ff";
    let left = await mergeSort(arr.slice(0, Math.floor((arr.length + 1) / 2)), low, mid)
    if (!isRunning) return
    let right = await mergeSort(arr.slice(Math.floor((arr.length + 1) / 2)), mid + 1, high)
    if (!isRunning) return
    return await merge(left, right, low, high)
}
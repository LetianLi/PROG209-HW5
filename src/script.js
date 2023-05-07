let tasks = [];

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM loaded");
    document.getElementById("getStartedBtn").addEventListener("click", goToAddPage);
    document.getElementById("getStartedBtn2").addEventListener("click", goToAddPage);
    document.getElementById("addTaskBtn").addEventListener("click", createArrayObj);
});

$(document).on("pagebeforeshow", "#DisplayPage", function (event) { 
    displayTasks();
});

function goToAddPage() {
    window.location = "#AddPage";
}

function createArrayObj() {
    let taskName = document.getElementById("taskNameInput").value;
    let taskType = document.getElementById("taskTypeInput").value;
    let taskPriority = document.getElementById("taskPriorityInput").value;
    //task array
    let task = {
        name: taskName,
        type: taskType,
        priority: taskPriority,
    };
    tasks.push(task);

    /*displays task added successfully so I know it actually
     ran the function and added to the array properly.*/
    let counter = document.getElementById("arrayConfirm");
    counter.innerHTML = "Task added successfully!";
}

function displayTasks() {
    if (tasks.length > 0) {
        // create table and hide button
        createTaskTable();
        document.getElementById("getStartedBtn2").style = "display: none";
    } else {
        // replace table with empty message and show button
        document.getElementById("table").innerHTML = "Uh oh, you don't have anything in your task list yet. Try adding one";
        document.getElementById("getStartedBtn2").style = "display: block";
    }
}

function createTaskTable() {
    let table = document.getElementById("table");

    //to Clears the table
    table.innerHTML = "";

    //For Creating the header rows
    let headerRow = document.createElement("tr"); //tablr row

    //for header of name col
    let nameHeader = document.createElement("th"); //table header
    nameHeader.innerHTML = "Name";
    headerRow.appendChild(nameHeader);

    //for header of type col
    let typeHeader = document.createElement("th");
    typeHeader.innerHTML = "Type";
    headerRow.appendChild(typeHeader);

    //for header of priority col
    let priorityHeader = document.createElement("th");
    priorityHeader.innerHTML = "Priority";
    headerRow.appendChild(priorityHeader);


    table.appendChild(headerRow);

    //setting up rows for each task item in array
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let row = document.createElement("tr");

        //for name col
        let nameCell = document.createElement("td");
        nameCell.innerHTML = task.name;
        row.appendChild(nameCell);

        //for type col
        let typeCell = document.createElement("td");
        typeCell.innerHTML = task.type;
        row.appendChild(typeCell);

        //for priority col
        let priorityCell = document.createElement("td");
        priorityCell.innerHTML = task.priority;
        row.appendChild(priorityCell);


        table.appendChild(row);
    }
}
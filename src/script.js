let tasks = [];

let Task = function(taskName, taskType, taskPriority) {
    this.name = taskName;
    this.type = taskType;
    this.priority = taskPriority;

    if (this.priority === "High") this.priorityNumber = 1;
    else if (this.priority === "Medium") this.priorityNumber = 2;
    else this.priorityNumber = 3;
}

// prepush tasks
tasks.push(new Task("Apply for social security", "Life", "High"));
tasks.push(new Task("Buy groceries", "Life", "Low"));
tasks.push(new Task("Check for response from support ticket", "Work", "High"));
tasks.push(new Task("Complain about pay", "Work", "Low"));
tasks.push(new Task("Do Homework", "School", "Medium"));
tasks.push(new Task("Review class notes", "School", "Medium"));
tasks.push(new Task("Talk to coworker", "Work", "Low"));

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM loaded");
    document.getElementById("getStartedBtn").addEventListener("click", goToAddPage);
    document.getElementById("getStartedBtn2").addEventListener("click", goToAddPage);
    document.getElementById("addTaskBtn").addEventListener("click", createArrayObj);

    // regenerate table whenever sort/filter settings change
    let regenDisplayElements = Array.from(document.getElementsByClassName("regenDisplay"));
    regenDisplayElements.forEach(element => element.addEventListener("change", displayTasks));
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
    let task = new Task(taskName, taskType, taskPriority);
    tasks.push(task);

    /*displays task added successfully so I know it actually
     ran the function and added to the array properly.*/
    let counter = document.getElementById("arrayConfirm");
    counter.innerHTML = "Task added successfully!";
  }

function displayTasks() {
    if (tasks.length > 0) {
        // create table and hide button
        let processedTaskList = processTaskList();
        createTaskTable(processedTaskList);
        document.getElementById("getStartedBtn2").style = "display: none";
    } else {
        // replace table with empty message and show button
        document.getElementById("table").innerHTML = "Uh oh, you don't have anything in your task list yet. Try adding one";
        document.getElementById("getStartedBtn2").style = "display: block";
    }
}

function processTaskList() {
    // Filter task list
    let allowedTypes = Array.from(document.getElementsByClassName("filterTypeSetting")).filter(checkbox => checkbox.checked).map(checkedBoxes => checkedBoxes.value);
    let allowedPriorities = Array.from(document.getElementsByClassName("filterPrioritySetting")).filter(checkbox => checkbox.checked).map(checkedBoxes => checkedBoxes.value);
    
    let filteredTasks = tasks.filter(task => {
        let passesTypeCheck = allowedTypes.length === 0 || allowedTypes.includes(task.type);
        let passesPriorityCheck = allowedPriorities.length === 0 || allowedPriorities.includes(task.priority);

        console.log(task);
        console.log("Passes type: " + passesTypeCheck);
        console.log("Passes priority: " + passesPriorityCheck);
        return passesTypeCheck && passesPriorityCheck;
    });

    // Sort task list
    let sortProperty = document.getElementById("sortSetting").value;
    let sortAscending = document.getElementById("sortAscendingCheckBox").checked;
    let sortedTasks = Array.from(filteredTasks);
    sortedTasks.sort((taskA, taskB) => {
        let propA = taskA[sortProperty];
        let propB = taskB[sortProperty];
        
        let sortValue;
        if (typeof propA === "string") {
            sortValue = propA.localeCompare(propB);
        } else if (typeof propA === "number") {
            sortValue = propA - propB;
        }

        if (sortAscending) {
            return sortValue;
        } else {
            return -sortValue;
        }
    });

    return sortedTasks;
}

function createTaskTable(processedTaskList) {
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
    processedTaskList.forEach(task => {
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
    });
}
const taskInput = document.getElementById("task-input");
const taskDescriptionInput = document.getElementById("task-description-input");
const allTasksHolder = document.getElementById("tasks-holder");
const confirmButton = document.getElementById("confirm-button");

confirmButton.addEventListener('click', createTask);

let currentTasksArray = [];
let storedTasks = [];

if (localStorage.getItem("current-tasks") != null) {
    storedTasks = JSON.parse(localStorage.getItem("current-tasks"));
    currentTasksArray = storedTasks;

    for (let storedTask of storedTasks) {
        let taskContainer = document.createElement("article");
        taskContainer.classList.add("task-container");
        taskContainer.style.display = "flex";

        let taskDetails = document.createElement("article");
        taskDetails.style.wordBreak = "break-word";

        let taskCompleteCheckbox = document.createElement("input");
        taskCompleteCheckbox.type = "checkbox";

        taskCompleteCheckbox.style.marginBottom = "auto";

        let taskIndex = storedTasks.indexOf(storedTask);

        taskCompleteCheckbox.checked = storedTasks[taskIndex].taskComplete;

        if(taskCompleteCheckbox.checked)
        {
            taskContainer.classList.add("task-complete");
        }

        let task = document.createElement("p");
        let taskDescription = document.createElement("p");

        task.classList.add("task-details-text");
        taskDescription.classList.add("task-details-text");

        //set to saved task input value
        task.textContent = storedTask.taskName;
        //set to saved task dscription value
        taskDescription.textContent = storedTask.description;

        let deleteTaskButton = document.createElement("button");

        deleteTaskButton.style.marginBottom = "auto";
        deleteTaskButton.classList.add("delete-task");
        deleteTaskButton.innerHTML = "delete";

        taskCompleteCheckbox.addEventListener('change', taskCompletion);
        deleteTaskButton.addEventListener('click', playTaskExitAnim);

        taskDetails.append(task, taskDescription);
        taskContainer.append(taskCompleteCheckbox, taskDetails, deleteTaskButton);
        allTasksHolder.appendChild(taskContainer);

        taskContainer.classList.add("task-enter");
    }
}



function createTask() {
    let inputtedTask = taskInput.value.trim();


    if (inputtedTask != "") {
        let taskToStore =
        {
            taskName: taskInput.value,
            description: taskDescriptionInput.value,
            taskComplete: false,
        };

        let taskContainer = document.createElement("article");
        taskContainer.classList.add("task-container");
        taskContainer.style.display = "flex";

        let taskDetails = document.createElement("article");
        taskDetails.style.wordBreak = "break-word";

        let taskCompleteCheckbox = document.createElement("input");
        taskCompleteCheckbox.type = "checkbox";

        taskCompleteCheckbox.style.marginBottom = "auto";

        let task = document.createElement("p");
        let taskDescription = document.createElement("p");


        task.classList.add("task-details-text");
        taskDescription.classList.add("task-details-text");

        task.textContent = taskInput.value;
        taskDescription.textContent = taskDescriptionInput.value;

        let deleteTaskButton = document.createElement("button");

        deleteTaskButton.style.marginBottom = "auto";
        deleteTaskButton.classList.add("delete-task");
        deleteTaskButton.innerHTML = "delete";

        taskCompleteCheckbox.addEventListener('change', taskCompletion);
        deleteTaskButton.addEventListener('click', playTaskExitAnim);

        taskDetails.append(task, taskDescription);
        taskContainer.append(taskCompleteCheckbox, taskDetails, deleteTaskButton);
        allTasksHolder.appendChild(taskContainer);

        taskContainer.classList.add("task-enter");

        let taskToStoreAddedToArray = false; 

        if(taskToStoreAddedToArray == false){
            currentTasksArray.splice(currentTasksArray.length, 0, taskToStore);
            taskToStoreAddedToArray = true;
        }


        localStorage.setItem('current-tasks', JSON.stringify(currentTasksArray));

    }
}


function playTaskExitAnim() {
    let taskContainers = document.getElementsByClassName("task-container");
    let storedTasks = JSON.parse(localStorage.getItem('current-tasks'));
    let deletedOneTask = false;

    for (let taskContainer of taskContainers) {
        if (taskContainer.contains(this)) {

            let taskDetails = taskContainer.getElementsByClassName("task-details-text");

            taskContainer.classList.remove("task-enter");
            taskContainer.classList.add("task-exit");

            for (storedTask of storedTasks) {
                let storedTaskIndex = storedTasks.findIndex(storedTask=> storedTask.taskName == taskDetails[0].textContent && storedTask.description == taskDetails[1].textContent);

                if (storedTask.taskName == taskDetails[0].textContent && storedTask.description == taskDetails[1].textContent && deletedOneTask == false)  {
                    storedTasks.splice(storedTaskIndex, 1);
                    currentTasksArray.splice(currentTasksArray[storedTaskIndex], 1);
                    console.log(storedTasks);

                    localStorage.setItem('current-tasks', JSON.stringify(storedTasks));
                    deletedOneTask = true;

                    setTimeout(deleteTask, 100);

                    function deleteTask() {
                        taskContainer.remove();
                    }
                }
                else {
                    console.log("...");
                }
            }
        }
    }
}



function taskCompletion() {
    let taskContainers = Array.from(document.getElementsByClassName("task-container"));
    const storedTasks = JSON.parse(localStorage.getItem('current-tasks'));

    if (this.checked) {
        for (let taskContainer of taskContainers) {
            if (taskContainer.contains(this)) {
                //findes the position of the task in the list of tasks
                let taskIndex = taskContainers.indexOf(taskContainer);

                taskContainer.classList.add("task-complete");

                storedTasks[taskIndex].taskComplete = true;
            }
        }
    }
    else {
        for (let taskContainer of taskContainers){
            if (taskContainer.contains(this)) {
                let taskIndex = taskContainers.indexOf(taskContainer);

                taskContainer.classList.remove("task-complete");

                storedTasks[taskIndex].taskComplete = false; 
            }
        }
    }

    localStorage.setItem('current-tasks', JSON.stringify(storedTasks))
}
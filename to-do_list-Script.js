const taskInput = document.getElementById("task-input");
const taskDescriptionInput = document.getElementById("task-description-input");
const allTasksHolder = document.getElementById("tasks-holder");
const confirmButton = document.getElementById("confirm-button");

confirmButton.addEventListener('click', createTask);


function createTask()
{
    const inputtedTask = taskInput.value.trim();

    if(inputtedTask != "")
    {
       const taskContainer = document.createElement("section");
       taskContainer.classList.add("task-container");
       taskContainer.style.display = "flex";

       const taskDetails = document.createElement("article");
       taskDetails.style.wordBreak = "break-word";

       const taskCompleteCheckbox = document.createElement("input");
       taskCompleteCheckbox.type = "checkbox";

       taskCompleteCheckbox.style.marginBottom = "auto";
       
       const task = document.createElement("p");
       const taskDescription = document.createElement("p");


       task.classList.add("task-details-text");
       taskDescription.classList.add("task-details-text");

       task.textContent = taskInput.value;
       taskDescription.textContent = taskDescriptionInput.value;

       const deleteTaskButton = document.createElement("button");

       deleteTaskButton.style.marginBottom = "auto";
       deleteTaskButton.classList.add("delete-task");
       deleteTaskButton.innerHTML = "delete";

       taskCompleteCheckbox.addEventListener('change', taskCompletion);
       deleteTaskButton.addEventListener('click', playTaskExitAnim);

       taskContainer.classList.add("task-enter");
       taskDetails.append(task, taskDescription);
       taskContainer.append(taskCompleteCheckbox, taskDetails, deleteTaskButton);
       allTasksHolder.appendChild(taskContainer);
    }
}

function playTaskExitAnim()
{
    const taskContainers = document.getElementsByClassName("task-container");

    for(const taskContainer of taskContainers)
    {
        if(taskContainer.contains(this))
        {
            taskContainer.classList.remove("task-enter");
            taskContainer.classList.add("task-exit");

            setTimeout(deleteTask, 100);

            function deleteTask()
            {
                taskContainer.remove();
            }
        }
    }
}
    



function taskCompletion()
{
    const taskContainers = document.getElementsByClassName("task-container");

    if(this.checked)
    {
        for(const taskContainer of taskContainers)
        {
            if(taskContainer.contains(this))
            {
                taskContainer.classList.add("task-complete");
            }
        }
    }
    else
    {
        for(const taskContainer of taskContainers)
        {
            if(taskContainer.contains(this))
            {
                taskContainer.classList.remove("task-complete");
            }
        }
    }
}
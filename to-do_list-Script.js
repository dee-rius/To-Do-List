const taskInput = document.getElementById("task-input");
const taskDescriptionInput = document.getElementById("task-description-input");
const allTasksHolder = document.getElementById("tasks-holder");
const confirmButton = document.getElementById("confirm-button");

confirmButton.addEventListener('click', createTask);

let currentTasksArray = [];
let storedTask = []
if(localStorage.getItem("current-tasks") != null)
{
    storedTasks = JSON.parse(localStorage.getItem("current-tasks"));
    currentTasksArray = storedTasks;

    for(let storedTask of storedTasks)
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

       //set to saved task input value
       task.textContent = storedTask.taskName;
       //set to saved task dscription value
       taskDescription.textContent = storedTask.description;

       const deleteTaskButton = document.createElement("button");

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



function createTask()
{
    let inputtedTask = taskInput.value.trim();
    

    if(inputtedTask != "")
    {
       let taskToStore = 
       {
        taskName: taskInput.value,
        description: taskDescriptionInput.value,
       };
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

       taskDetails.append(task, taskDescription);
       taskContainer.append(taskCompleteCheckbox, taskDetails, deleteTaskButton);
       allTasksHolder.appendChild(taskContainer);

       taskContainer.classList.add("task-enter");


       currentTasksArray.splice(currentTasksArray.length, 0, taskToStore);
       

       localStorage.setItem('current-tasks', JSON.stringify(currentTasksArray));
    }
}

function playTaskExitAnim()
{
    const taskContainers = document.getElementsByClassName("task-container");
    

    for(const taskContainer of taskContainers)
    {
        if(taskContainer.contains(this))
        {
          const taskDetails = taskContainer.getElementsByClassName("task-details-text");
          
            taskContainer.classList.remove("task-enter");
            taskContainer.classList.add("task-exit");

            setTimeout(deleteTask, 100);

            function deleteTask()
            {
                taskContainer.remove();
            }
            
            for(storedTask of storedTasks)
            {
              let storedTaskIndex = storedTasks.findIndex(storedTask => storedTask.taskName == taskDetails[0].textContent && storedTask.description == taskDetails[1].textContent);
              
              if(storedTask.taskName == taskDetails[0].textContent && storedTask.description == taskDetails[1].textContent)
              {
                storedTasks.splice(storedTaskIndex, 1);
                console.log(storedTasks)
                
                localStorage.setItem('current-tasks', JSON.stringify(storedTasks));
              }
              else
              {
                console.log("...")
              }
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
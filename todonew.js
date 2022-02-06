///defining ui variables
const addTaskBtn = document.querySelector("#add-task");
const taskInput = document.querySelector("#label");
const filterInput = document.querySelector(".filter input");
const taskList = document.querySelector(".task-lists");
const clearTasksBtn = document.querySelector(".btn-black")

//load all event listners
loadAllEventListners();

//define loadAllEventListners
function loadAllEventListners(){
    document.addEventListener("DOMContentLoaded", ShowFromLocalStorage)
    addTaskBtn.addEventListener("click", addTask);
    clearTasksBtn.addEventListener("click", clearTasks);
    filterInput.addEventListener("keyup", filter);
    taskList.addEventListener("click", deleteItem)
}

//define addTask
function addTask(){
    if(taskInput.value === ""){
        alert("enter somethinf to add!")
    }
    else{
        //creating list element
        let li = document.createElement("li");
        //adding classname to list
        li.className = "list-item";
        //appending textNode to list
        li.appendChild(document.createTextNode(taskInput.value))
        //creating link elememt
        let link = document.createElement("a")
        //adding class name to link
        link.className = "delete-item"
        //adding icon to link 
        link.innerHTML = "<i class='fas fa-times-circle'></i>";
        //appending link to listners
        li.appendChild(link);
        //appending list to ul
        taskList.appendChild(li);
        /// add task to local storage
        addTaskToLocalStorage(taskInput.value);
        //clear task taskInput
        taskInput.value = "";
    }
}

//defining clearTasks
function clearTasks(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    /// clear alltasks from LocalStorage
    clearTasksFromLocalStorage();
}
 
//define filter callback function
function filter(e){
    let inputText = e.target.value.toLowerCase();
    listItems = document.querySelectorAll(".list-item");
    listItems.forEach(function(listItem){
        let actualText = listItem.textContent;
        if(actualText.indexOf(inputText) === -1){
            listItem.style.display = "none";
        }
        else{
            listItem.style.display = "flex";
        }
    })
}

//define delete item
function deleteItem(e){
    let target =  e.target;
    if(target.parentElement.classList.contains("delete-item")){
        target.parentElement.parentElement.remove();
        //deleting item from localStorage
        deleteItemFromLocalStorage(target.parentElement.parentElement);
    }
}

//define addTaskToLocalStorage
function addTaskToLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

}
//define ShowFromLocalStorage
function ShowFromLocalStorage(){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        //creating list element
        let li = document.createElement("li");
        //adding classname to list
        li.className = "list-item";
        //appending textNode to list
        li.appendChild(document.createTextNode(task))
        //creating link elememt
        let link = document.createElement("a")
        //adding class name to link
        link.className = "delete-item"
        //adding icon to link 
        link.innerHTML = "<i class='fas fa-times-circle'></i>";
        //appending link to listners
        li.appendChild(link);
        //appending list to ul
        taskList.appendChild(li);
    })
}

//define clearTasksFromLocalStorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//define deleteItemFromLocalStorage

function deleteItemFromLocalStorage(element){
    let text = element.textContent;
    let tasks
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function(task, index){
        if(task === text){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


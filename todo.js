//defining ui variables
const input = document.querySelector("#label");
const addTask = document.querySelector("#add-task");
const taskLists = document.querySelector(".task-lists");
const listItem = document.querySelector(".list-item");
const input2 = document.querySelector(".filter input");
const btnBlack = document.querySelector(".btn-black");
//load all event listners
loadEventListners();
//defining load event listners
function loadEventListners(){
    document.addEventListener("DOMContentLoaded", getFromLocalStorage);
    addTask.addEventListener("click", addItem);
    taskLists.addEventListener("click", removeItem);
    input2.addEventListener("keyup", filter);
    btnBlack.addEventListener("click", clear);
}

//define getFromLocalStorage
function getFromLocalStorage(){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } 
    tasks.forEach(function(task){
         //create list item
         let li = document.createElement("li");
         li.className = "list-item";
         // append text to list item
         li.appendChild(document.createTextNode(task));
         //create link element
         let link = document.createElement("a");
         // adding class
         link.className = "delete-item"
         //attach icon to link
         link.innerHTML = "<i class='fas fa-times-circle'></i>"
         //attaching link to li
         li.appendChild(link);
         //appending list to ul
         taskLists.appendChild(li);
    })
}
// defining addItem 
function addItem(e){

    if(input.value === ""){
        alert("please enter something to add");
    }
    else{
         //create list item
        let li = document.createElement("li");
        li.className = "list-item";
        // append text to list item
        li.appendChild(document.createTextNode(input.value));
        //create link element
        let link = document.createElement("a");
        // adding class
        link.className = "delete-item"
        //attach icon to link
        link.innerHTML = "<i class='fas fa-times-circle'></i>"
        //attaching link to li
        li.appendChild(link);
        //appending list to ul
        taskLists.appendChild(li);
        // addd ot local storage
        addToLocalStorage(input.value);

        //clear input
        input.value = "";
        //add to local storage
    }
   
    //prevent default behaviour
    e.preventDefault();
}
//define addToLocalStorage
function addToLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//defining removeItem
function removeItem(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        e.target.parentElement.parentElement.remove();
    }
    removeItemFromLS(e.target.parentElement.parentElement);
}
//defining filter
function filter(e){
    let text = e.target.value.toLowerCase();
    let elements = document.querySelectorAll(".list-item");
    elements.forEach(function(element){
        let actualText = element.textContent.toLowerCase();
        if(actualText.indexOf(text) === -1){
            element.style.display = "none";
        }
        else{
            element.style.display = "flex";
        }
    })  
}
//defining removeItemFromLS
function removeItemFromLS(taskItem){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
//clearing all taskLists
function clear(){
    while(taskLists.firstChild){
        taskLists.removeChild(taskLists.firstChild);
    }
    // clear all tasks from local localStorage
    clearAllFromLocalStorage();
}
// defining clearAllFromLocalStorage

function clearAllFromLocalStorage(){
    localStorage.clear();
}
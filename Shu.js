const INPUT = document.getElementById("input");
const BUTTON = document.getElementById("B1");
const TODO = document.getElementById("todo");
const DONE = document.getElementById("done");
const LOCAL_STORAGE = 'my_todo_list';
const RØD = document.getElementById("rød");
const RØD_BUTTON = document.getElementById("rød");


BUTTON.addEventListener('click', add_task_and_save);

/*
function gør_den_rød(ev){

    const element = ev.target;
    element.style.backgroundColor = "red";

}
*/
function updateRødButton() {
    if (tasks.length > 0) {
        RØD_BUTTON.disabled = false; // Aktiver knappen, hvis der er mindst én opgave
    } else {
        RØD_BUTTON.disabled = true; // Deaktiver knappen, hvis der ikke er nogen opgaver
    }
}

var tasks
if(localStorage.getItem(LOCAL_STORAGE) === null){
    
    //tasks = ['task 1', 'task 2'];
    var tasks_string = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE, task_string);
    console.log('A Todolist was created in local storage');
} else{
    var json_tasks = localStorage.getItem(LOCAL_STORAGE);
    tasks = JSON.parse(json_tasks);

    

    for(let i = 0;i < tasks.length;i++){
        INPUT.value = tasks[i];
        add_task();
    }

    console.log('LOADED')
}


function add_task_and_save(event){
    add_task();
    tasks.push(INPUT.value);
    let task_json = JSON.stringify(tasks);

    localStorage.setItem(LOCAL_STORAGE, task_json)

    console.log('YAY is WORKING');
    updateRødButton();

}

function add_task () {
    if(INPUT.value !==""){
    let new_task = document.createElement('li');
    new_task.classList.add('task');
    new_task.classList.add('list-group-item');
    /*new_task.addEventListener('dragstart', drag);
    new_task.addEventListener('dragover', drop_not_allowed);
    new_task.draggable = true;*/

    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    new_task.appendChild(checkbox);
    checkbox.addEventListener('click', done_task);

    let span = document.createElement('span');
    span.innerText = INPUT.value;
    span.contentEditable = true;
    new_task.appendChild(span);

    let trash = document.createElement('i');
    trash.classList.add('fa-solid');
    trash.classList.add('fa-trash');
    new_task.appendChild(trash);
        trash.addEventListener('click', delete_task);


    TODO.appendChild(new_task);


    setTimeout( 
    function(){
        INPUT.value = "";
    }, 10);
    
    } 

}

function delete_task (event){
    event.currentTarget.parentNode.remove();
    tasks.pop(INPUT.value);
    let task_json = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE, task_json);
    updateRødButton();
}

//CRUD Create, Read, Update, Delete
function done_task (){
    var checkbox = event.currentTarget;
    let task = event.currentTarget.parentNode;
    if(checkbox.checked){
    DONE.appendChild(task);
    } else{
        TODO.appendChild(task);
    }
}
window.onload = function() {
    updateRødButton();
};
//Drag and drop
/*
var item;
function drag (event){
    item = event.target;
    item.classList.add('active');
}

function drop (event){
    event.preventDefault;
    event.target.appendChild(item);
    event.currentTarget.style.backgroundColor = 'lightblue';

    if(event.target.id == "done"){
        item.firstChild.checked = "checked";
    } else {
        item.firstChild.checked = "";
    }

    item.classList.remove('active');
}
/*
function dragover (event){
    event.preventDefault();
    event.currentTarget.style.backgroundColor = 'lightgreen';
}

function dragleave (event){
    event.currentTarget.style.backgroundColor = 'lightblue';
}

function drop_not_allowed (event){
    event.stopPropagation();
}
*/
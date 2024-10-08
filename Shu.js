const INPUT = document.getElementById("input");
const BUTTON = document.getElementById("B1");
const TODO = document.getElementById("todo");
const DONE = document.getElementById("done");
const LOCAL_STORAGE = 'my_todo_list';
const RØD_BUTTON = document.getElementById("rød");

BUTTON.addEventListener('click', add_task_and_save);

var tasks;
if (localStorage.getItem(LOCAL_STORAGE) === null) {
    tasks = [];  // Initialiser som et tomt array
    var tasks_string = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE, tasks_string);
    console.log('A Todolist was created in local storage');
} else {
    var json_tasks = localStorage.getItem(LOCAL_STORAGE);
    tasks = JSON.parse(json_tasks);

    // Genskab opgaver fra localStorage
    for (let i = 0; i < tasks.length; i++) {
        INPUT.value = tasks[i];
        add_task();
    }

    console.log('LOADED');
}

function add_task_and_save(event) {
    add_task();
    tasks.push(INPUT.value);
    let task_json = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE, task_json);
    console.log('Task added and saved');
    updateRødButton();
}

function add_task() {
    if (INPUT.value !== "") {
        let new_task = document.createElement('li');
        new_task.classList.add('task', 'list-group-item');

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        new_task.appendChild(checkbox);
        checkbox.addEventListener('click', done_task);

        let span = document.createElement('span');
        span.innerText = INPUT.value;
        span.contentEditable = true;
        new_task.appendChild(span);

        let trash = document.createElement('i');
        trash.classList.add('fa-solid', 'fa-trash');
        new_task.appendChild(trash);
        trash.addEventListener('click', delete_task);

        TODO.appendChild(new_task);

        setTimeout(function() {
            INPUT.value = "";
        }, 10);
    }
}

function delete_task(event) {
    const taskElement = event.currentTarget.parentNode;
    const taskText = taskElement.querySelector('span').innerText;
    tasks = tasks.filter(task => task !== taskText); // Fjern opgaven fra tasks
    taskElement.remove(); // Fjern opgaven fra DOM'en
    let task_json = JSON.stringify(tasks);
    localStorage.setItem(LOCAL_STORAGE, task_json);
    updateRødButton();
}

function done_task() {
    var checkbox = event.currentTarget;
    let task = event.currentTarget.parentNode;
    if (checkbox.checked) {
        DONE.appendChild(task);
    } else {
        TODO.appendChild(task);
    }
}

function updateRødButton() {
    console.log("Antal tasks:", tasks.length);
    if (tasks.length > 0) {
        RØD_BUTTON.disabled = false; // Aktiver knappen
    } else {
        RØD_BUTTON.disabled = true;  // Deaktiver knappen
    }
}

window.onload = function() {
    updateRødButton();
};

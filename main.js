const taskInput = document.querySelector('#input');
const addBtn = document.querySelector('#add-button');
const taskContainer = document.querySelector('.task-container');

loadData();

addBtn.addEventListener('click', () => {
    createToDo();
    taskInput.value = '';
});

function createToDo() {
    if (taskInput.value == '') {
        alert('Por favor introduce una tarea');
    } 
    else {
    const task = document.createElement('div');
    task.classList.add('task');
    taskContainer.appendChild(task);

    const check = document.createElement('div');
    check.classList.add('check-btn');
    task.appendChild(check);

    const taskName = document.createElement('p');
    taskName.classList.add('task-name');
    taskName.textContent = taskInput.value;
    taskName.contentEditable = 'true';
    task.appendChild(taskName);

    const editBtn = document.createElement('i');
    editBtn.classList.add('fa-solid', 'fa-pen-to-square', 'edit');
    task.appendChild(editBtn);

    const saveEdit = document.createElement('i');
    saveEdit.classList.add('fa-solid', 'fa-floppy-disk', 'save-edit');
    task.appendChild(saveEdit);
    saveEdit.style.display = 'none';

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa-solid', 'fa-x', 'delete');
    task.appendChild(deleteBtn);
    }
    saveData();
}

taskContainer.addEventListener('click', (e) => {
    checkTodo(e.target);
})

function checkTodo(element) {
    if (element.classList.contains('check-btn')) {
        element.classList.toggle('checked');
        element.nextElementSibling.classList.toggle('task-completed');
    }
    saveData();
}

taskContainer.addEventListener('click', (e) => {
    deleteTodo(e.target);
})

function deleteTodo(element) {
    if (element.classList.contains('delete')) {
        element.parentElement.remove();
    }
    saveData();
}

taskContainer.addEventListener('click', (e) => {
    editTodo(e.target);
    console.log(e.target);
})

function editTodo(element) {
    if (element.classList.contains('edit')) {
        element.previousElementSibling.contentEditable = 'true';
        element.previousElementSibling.focus();
    }
    saveData();
}

function saveData() {
    localStorage.setItem('task', taskContainer.innerHTML);
}

function loadData() {
    taskContainer.innerHTML = localStorage.getItem('task');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.execCommand('insertLineBreak');
        e.preventDefault();
    }
})
document.getElementById('todoForm').addEventListener('submit', saveTodo);
window.onload = fetchTodos;

function saveTodo(e) {
    let todoInput = document.getElementById('todoInput').value;
    let todoId = chance.guid();
    let todoStatus = '<i class="far fa-square"></i>';
    
    if (todoInput != '') {
        let todo = {
            id: todoId,
            todo: todoInput,
            status: todoStatus,
        }
    
        if (localStorage.getItem('todos') == null) {
            let todos = [];
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
        } else {
            let todos = JSON.parse(localStorage.getItem('todos'));
            todos.push(todo)
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    } else {
        alert('Must type something')
    }

    document.getElementById('todoForm').reset();

    fetchTodos();

    e.preventDefault();
}

function checkTodoStatus(id) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let statusChecked = '<i class="far fa-check-square"></i>';
    let statusEmpty = '<i class="far fa-square"></i>'

    for (i=0;i<todos.length;i++) {
        if (todos[i].id == id && todos[i].status == statusEmpty) {
            todos[i].status = statusChecked;
        } else if (todos[i].id == id && todos[i].status == statusChecked) {
            todos[i].status = statusEmpty;
        }
    }

    localStorage.setItem('todos', JSON.stringify(todos));
    fetchTodos();
}

function deleteOneTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    
    for(i=0;i<todos.length;i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
        }
    }

    localStorage.setItem('todos', JSON.stringify(todos));
    fetchTodos();
}

function clearAllTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.splice(todos);
    localStorage.setItem('todos', JSON.stringify(todos));

    fetchTodos();
}


function fetchTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todoList = document.getElementById('todoList');

    todoList.innerHTML = '';

    for (i=0;i<todos.length;i++) {
        let id = todos[i].id
        let todo = todos[i].todo;
        let status = todos[i].status;

        todoList.innerHTML +=   '<div>'+
                                '<h1 class="todo-item">'+ todo + '</h1><button onclick="deleteOneTodo(\''+id+'\')"><i class="fa fa-trash"></i></button>'+
                                '<a href="#" onclick="checkTodoStatus(\''+id+'\')">'+status+'</a>'+
                                '</div>';
    }
}
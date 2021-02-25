document.getElementById('todoForm').addEventListener('submit', saveTodo);

function saveTodo(e) {
    let todoInput = document.getElementById('todoInput').value;
    let todoId = chance.guid();
    let todoStatus = '<i class="far fa-square"></i>';

    let todo = {
        id: todoId,
        todo: todoInput,
        status: todoStatus
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

    document.getElementById('todoForm').reset();

    fetchTodos();

    e.preventDefault();
}

function checkTodoStatus(id) {
    let todos = JSON.parse(localStorage.getItem('todos'));

    for (i=0;i<todos.length;i++) {
        if (todos[i].id == id) {
            todos[i].status = '<i class="far fa-check-square"></i>';
        }
    }

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
                                '<h1 class="todo-item">'+ todo + '</h1><button><i class="fa fa-trash"></i></button>'+
                                '<a href="#" onclick="checkTodoStatus(\''+id+'\')">'+status+'</a>'+
                                '</div>';
    }
}
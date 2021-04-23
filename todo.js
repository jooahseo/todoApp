const btn = document.querySelector('#submitBtn');
const inputBox = document.getElementById("newTodo");
const body = document.querySelector('body');
const list = document.querySelector('#list');


const storedTodos = JSON.parse(localStorage.getItem('todos'));
if(storedTodos){
    parseTodosList(storedTodos);
}

btn.addEventListener('click',function(e){
    e.preventDefault();
    const newTodoObj = {'todo':inputBox.value, 'done':false}
    appendTodo(newTodoObj);
    addToLocalStorage(newTodoObj);
    inputBox.value ="";
})

list.addEventListener('click',function(e){
    let task = null;
    let selectedTodo = null;
    if(e.target.tagName === "SPAN"){
        e.target.classList.toggle("done");
        if(e.target.className == 'done'){
            task = 'doneToTrue'
        }else{
            task = 'doneToFalse'
        }
        selectedTodo = e.target.innerText;
    }else if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
        task = 'remove'
        selectedTodo = e.target.parentElement.firstChild.innerText;
    }
    updateLocalStorage(selectedTodo,task);
})

function parseTodosList(todos){
    for (todo of todos){
        appendTodo(todo);
    }
}

function appendTodo(todoObj){
    const newLi = document.createElement('li');
    const liValue = document.createElement('span');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add("btn"); 
    removeBtn.innerText = "Remove";
    liValue.innerText = todoObj['todo']

    if(todoObj['done']){
        liValue.className = 'done';
    }
    newLi.append(liValue);
    newLi.append(removeBtn);
    list.append(newLi);
}

function addToLocalStorage(todoObj){
    const todosArr = JSON.parse(localStorage.getItem('todos'));
    if (todosArr){
        todosArr.push(todoObj)
        localStorage.setItem('todos',JSON.stringify(todosArr));
    }else{
        const newTodos = [todoObj]
        localStorage.setItem('todos',JSON.stringify(newTodos));
    }
}

function updateLocalStorage(selectedTodo,task){
    const todosArr = JSON.parse(localStorage.getItem('todos'));
    let todoIndex = null;
    for (i=0; i<todosArr.length; i++){
        if(todosArr[i]['todo']==selectedTodo){
            todoIndex = i;
        }
    }
    if(task === 'doneToTrue'){
        todosArr[todoIndex]['done'] = true;
    }else if (task ==='doneToFalse'){
        todosArr[todoIndex]['done'] = false;
    }else if (task ==='remove'){
        todosArr.splice(todoIndex,1);
    }
    
    localStorage.setItem('todos',JSON.stringify(todosArr))

}

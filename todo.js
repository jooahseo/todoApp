const btn = document.querySelector('#submitBtn');
const inputBox = document.getElementById("newTodo");
const body = document.querySelector('body');
const list = document.querySelector('#list');


let storedValues = window.localStorage.myitems;
if(storedValues){
    list.innerHTML = storedValues;
}


btn.addEventListener('click',function(e){
    e.preventDefault();
    const newLi = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add("btn"); //for css selection
    removeBtn.innerText = "Remove";
    newLi.innerText = inputBox.value;

    newLi.append(removeBtn);
    list.append(newLi);
    store();
    inputBox.value ="";
})

list.addEventListener('click',function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("done");
    }else if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
    }
    store();
})

function store(){
    window.localStorage.myitems = list.innerHTML;
}
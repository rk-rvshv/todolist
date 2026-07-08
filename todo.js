//get dom elements
const input = document.getElementById('user-input');
const addbtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

//loading the todos with if- data exists, else- []empty array. (created a global array)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

//save todos in local storage
function savetodoitems() {
    localStorage.setItem('todos', JSON.stringify(todos))
};
// create list <li>...</li>
function createtodolist(todo, index) {
    const li = document.createElement('li');

    //checkbox logic output- <input type=checkbox>
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked

        // visible strick line through when todo completes
        textspan.style.textDecoration = todo.completed ? 'line-through' : "";
    });

    // creating text output- <span style="margin">...</span>
    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = "0 8px";
    if (todo.completed) {
        textspan.style.textDecoration = "line-through";
    }
    //edit tool in textspan
    textspan.addEventListener("dblclick", () => {
        const newtask = prompt('edit-tool', todo.text);
        if (newtask !== null) {
            todo.text = newtask.trim()
            textspan.textContent = newtask;
            savetodoitems();
        }
    });
    //delete btn output-<button>delete</button>
    const delbtn = document.createElement("button");
    delbtn.textContent = 'Delete';
    delbtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        savetodoitems();
    })
    li.appendChild(checkbox)
    li.appendChild(textspan)
    li.appendChild(delbtn)
    return li;
}

//render function which shows todos(global array->create one <li>->add it to <ul>...go on) on screen
function render() {
    list.innerHTML = "";
    todos.forEach((todo,index) => {
        //  (adds li under <ul>) that is <ul><li>...</li></ul>
        const node = createtodolist(todo, index);
        
        list.appendChild(node)
    });

}
//ADD TODO - NEW TASK IS ADDED 
function addtodo(){
    const userinput = input.value.trim()
    if(!userinput){
        return;
    }
    todos.push({ text :userinput, completed:false});
    input.value ="";
    render()
    savetodoitems();
}
// using addtodo() through addbtn
addbtn.addEventListener("click",addtodo);
// addtodo calls when enter key pressed
input.addEventListener('keydown',(e)=>{
    if(e.key =='Enter'){
        addtodo()
    }
})
render();
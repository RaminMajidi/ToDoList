const taskAdder = document.querySelector('.taskAdder');
const myTasks = document.querySelector('.myTasks');
const tasks = JSON.parse(localStorage.getItem('taskList')) || [];

taskAdder.addEventListener('submit',addTask);
myTasks.addEventListener('click',toggleDone);
outputTasks();


function addTask(e){
    e.preventDefault();
    const textTask = this.querySelector('[name=task]').value;
    const task = {textTask, done: false};
    tasks.push(task);
    saveStorge();
    outputTasks();
    this.reset();
}
function saveStorge(){
    localStorage.setItem('taskList', JSON.stringify(tasks));
}

function outputTasks(){
    let html =tasks.map(function (data,i){
        let myclass = data.done ? 'done' :'';
        return '<li data-index='+i+'><div class="' + myclass+ '">'+
        data.textTask + '<span class="remove">X</span></div></li>';
    })
    myTasks.innerHTML = html.join('');
}
function toggleDone(e){
    const myEl = e.target;
    const mySel = myEl.parentElement;
    if (myEl.className === 'remove'){
        let index = mySel.parentElement.dataset.index;
        let temp = tasks.splice(index,1);
    }
    else{
        myEl.classList.toggle('done');
        tasks[mySel.dataset.index].done =! tasks[mySel.dataset.index].done;
    }
       saveStorge();
       outputTasks();
}
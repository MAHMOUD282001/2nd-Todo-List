let textContent = document.querySelector("#text-content");

let addBtn = document.querySelector(".add");

let removeAll = document.querySelector(".remove-all");


let allTasks = document.querySelector(".all-tasks");

// localStorage.clear();

//On Load --> Return Local Storage Content
window.onload = ()=>{
    if (localStorage.getItem("tasks").length == 0) return;

    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    
    tasks.forEach(task => {
        allTasks.innerHTML += 
        `<div class = "task-content">
                <li class = "task">
                    <input readonly type="text" value="${task.task}" class="task-value">
                    <button class = "btn edit-save">Edit</button>
                    <button class = "btn delete">Delete</button>
                </li>
        </div>`
    });
    
    let taskValues = document.querySelectorAll(".task-value")
    
    let completedTasks = document.querySelector(".completed span")
    
    
        tasks.forEach((task,index) => {
            if(task.completed === true){
                taskValues[index].classList.add("line-through")
                
                completedTasks.innerHTML++
                
            }
            
            else{
                taskValues[index].classList.remove("line-through")
                
            }
    })
    
    editAndSave()
    
    makeTaskCompleted()
    
    
    
    deleteItem()
    
    checkRemoveAll()
}


//Add Item To Local Storage and List
addBtn.addEventListener("click", ()=>{
    if (textContent.value === "" || textContent.value === " ") {
        alert("Please Add Your Task");
        return false;
    }
    
    if (document.querySelector(`input[value="${textContent.value}"]`)) {
        alert("Task exists");
        return false;
    }
    
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: textContent.value, completed: false }]));
    
    allTasks.innerHTML += 
    `<div class = "task-content">
            <li class = "task">
                <input readonly type="text" value="${textContent.value}" class="task-value">
                <button class = "btn edit-save">Edit</button>
                <button class = "btn delete">Delete</button>
            </li>
    </div>`
    
    textContent.value = ""
    
    editAndSave()
    
    makeTaskCompleted()    
    
    deleteItem()
    
    checkRemoveAll()
})




//Edit & Save Item In Local Storage & allTasks Container

function editAndSave(){
    let editSaveBtns = document.querySelectorAll(".edit-save")
    let taskValues = document.querySelectorAll(".task-value")
    
    editSaveBtns.forEach((editSaveBtn, index) =>{
        
            editSaveBtn.addEventListener("click", ()=>{
            
            
            if(editSaveBtn.innerHTML === "Edit"){
                
                editSaveBtn.innerHTML = "Save"
                
                taskValues[index].removeAttribute("readonly")
                
                taskValues[index].focus()
                
            }
            
            else if(editSaveBtn.innerHTML === "Save"){
                editSaveBtn.innerHTML = "Edit"
                
                taskValues[index].setAttribute("readonly", true)
                
                let newTasks = JSON.parse(localStorage.getItem("tasks"));
                
                newTasks[index].task = taskValues[index].value
                
                localStorage.setItem("tasks", JSON.stringify(newTasks))
                
            }
        })
        
    })
}






//Remove Item From Local Storage & allTasks Container

function deleteItem() {
    
    
    let deleteBtns = document.querySelectorAll(".delete")
    let tasks = document.querySelectorAll(".task")
    let taskValues = document.querySelectorAll(".task-value")
    let completedTasks = document.querySelector(".completed span")
    
    setInterval(()=>{
    
    deleteBtns.forEach((deleteBtn, index) =>{
        let newTasks = JSON.parse(localStorage.getItem("tasks"));        
        
        deleteBtn.addEventListener("click", ()=>{            
            tasks[index].classList.add("none")
            
            newTasks.forEach(task => {
                if (task.task === taskValues[index].value) {
                    
                    newTasks.splice(newTasks.indexOf(task), 1);
                    
                }                
              });
              
              localStorage.setItem("tasks", JSON.stringify(newTasks));
              
            
            
            
            // Bugaya Soghayara Bs Halenaha
            if(localStorage.getItem("tasks") === '[]'){
                allTasks.innerHTML = ""
                localStorage.clear()
                checkRemoveAll()
            }            
            
        })        
    })
    
},10)

deleteBtns.forEach((deleteBtn, index) =>{
    let newTasks = JSON.parse(localStorage.getItem("tasks"));        
    
    deleteBtn.addEventListener("click", ()=>{   
        
        if(taskValues[index].classList.contains("line-through")){
            completedTasks.innerHTML--
        }
        
    })
})

}





//Task Completed
function makeTaskCompleted(){
    
    
    let taskValues = document.querySelectorAll(".task-value")
    
    let completedTasks = document.querySelector(".completed span")
    
    taskValues.forEach((taskValue, index) =>{
        
        
        
        taskValue.addEventListener("click", ()=>{
            taskValue.classList.toggle("line-through")
            
            let newTasks = JSON.parse(localStorage.getItem("tasks"));
            
            if(taskValue.classList.contains("line-through")){
                
                newTasks[index].completed = true
                
                localStorage.setItem("tasks", JSON.stringify(newTasks))
                                
                
                completedTasks.innerHTML++
                
            }
            
            else{
                newTasks[index].completed = false
                
                localStorage.setItem("tasks", JSON.stringify(newTasks))
                
                completedTasks.innerHTML--
                
            }        
            })
    })    
    
    
}



//Remove All Tasks From Local Storage & allTasks Container
removeAll.addEventListener("click", ()=>{
    let completedTasks = document.querySelector(".completed span")
    allTasks.innerHTML = ""
    localStorage.clear()
    
    completedTasks.innerHTML= 0
    
    
    checkRemoveAll()
})



function checkRemoveAll(){
    if (localStorage.length !== 0){
        removeAll.classList.add("active")
    }
    
    else{
        removeAll.classList.remove("active")
    }
}

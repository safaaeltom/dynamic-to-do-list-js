// setup event listener for page load
document.addEventListener('DOMContentLoaded', function() {

// select the DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');


    // 1. load tasks from local storage
    function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); 
    }

// create the addtask function
    function createTask(taskText, save = true) {
        if (taskText == "") {
            alert("Please enter a task");
            return;
        }

// task creation and removal        
        let list = document.createElement("li");
        list.textContent = taskText;

        let btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.classList.add("remove-btn");
        btn.onclick = function() {
            list.remove();

            // 2. Remove task from local storage after deletion
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updated = storedTasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updated));
            };
                list.appendChild(btn);
                taskList.appendChild(list);

            // 3. save to local storage
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                storedTasks.push(taskText);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        }
        //add task from input
        function addTask() {
            let text = taskInput.value.trim();
            addTask(text);
            taskInput.value = "";
        }



            addButton.addEventListener("click", addTask);
            taskInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    addTask();
               }
            }
        );
        loadTasks();
    });

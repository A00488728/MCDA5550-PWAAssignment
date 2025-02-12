if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed: ', error);
            });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const prioritySelect = document.getElementById("prioritySelect");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `${task.name} - <strong>Priority: ${task.priority}</strong> 
                            <button class="deleteBtn">X</button> 
                            <button class="editPriorityBtn">Edit Priority</button>`;

            const deleteBtn = li.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => deleteTask(task.id));

            const editPriorityBtn = li.querySelector(".editPriorityBtn");
            editPriorityBtn.addEventListener("click", () => editPriority(task.id));

            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const taskName = taskInput.value.trim();
        const priority = prioritySelect.value; // Get selected priority

        if (taskName) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const newTask = { id: Date.now(), name: taskName, priority };
            console.log(newTask); // Check if priority is correctly assigned

            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
            taskInput.value = "";
        }
    };

    const deleteTask = (id) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const filteredTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        loadTasks();
    };

    const editPriority = (id) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = tasks.find(t => t.id === id);
        const newPriority = prompt("Enter new priority (urgent, normal, low):", task.priority);

        if (newPriority && ["urgent", "normal", "low"].includes(newPriority.toLowerCase())) {
            task.priority = newPriority;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        } else {
            alert("Invalid priority! Please enter one of the following: urgent, normal, low.");
        }
    };

    addTaskButton.addEventListener("click", addTask);

    loadTasks();
});

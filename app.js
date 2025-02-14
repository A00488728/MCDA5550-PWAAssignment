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

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `${task.name} - <strong>Priority: </strong> 
                            <select class="prioritySelect">
                                <option value="urgent" ${task.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
                                <option value="normal" ${task.priority === 'normal' ? 'selected' : ''}>Normal</option>
                                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                            </select>
                            <button class="deleteBtn">X</button>`;

            const prioritySelect = li.querySelector(".prioritySelect");
            prioritySelect.addEventListener("change", (e) => updateTaskPriority(task.id, e.target.value));

            const deleteBtn = li.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => deleteTask(task.id));

            taskList.appendChild(li);
        });
    };

    const addTask = () => {
        const taskName = taskInput.value.trim();

        if (taskName) {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            const newTask = { id: Date.now(), name: taskName, priority: "normal" }; // Default priority is 'normal'
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

    const updateTaskPriority = (id, newPriority) => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, priority: newPriority } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    addTaskButton.addEventListener("click", addTask);

    loadTasks();
});

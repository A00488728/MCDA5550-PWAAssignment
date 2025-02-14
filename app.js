// Register the Service Worker if supported by the browser
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register the service worker and log success or failure
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
    // Cache references to DOM elements for easy access
    const taskInput = document.getElementById("taskInput");  // Input field for adding tasks
    const addTaskButton = document.getElementById("addTaskButton");  // Button to add tasks
    const taskList = document.getElementById("taskList");  // The unordered list where tasks will be displayed

    // Function to load tasks from localStorage and render them
    const loadTasks = () => {
        // Retrieve tasks from localStorage or use an empty array if no tasks exist
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        
        // Clear the current list
        taskList.innerHTML = "";

        // Loop through each task and create an element for it in the list
        tasks.forEach(task => {
            // Create a list item for the task
            const li = document.createElement("li");
            li.innerHTML = `${task.name} - <strong>Priority: </strong> 
                            <select class="prioritySelect">
                                <option value="urgent" ${task.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
                                <option value="normal" ${task.priority === 'normal' ? 'selected' : ''}>Normal</option>
                                <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                            </select>
                            <button class="deleteBtn">X</button>`;

            // Add event listener for the priority dropdown to handle priority change
            const prioritySelect = li.querySelector(".prioritySelect");
            prioritySelect.addEventListener("change", (e) => updateTaskPriority(task.id, e.target.value));

            // Add event listener for the delete button to remove tasks
            const deleteBtn = li.querySelector(".deleteBtn");
            deleteBtn.addEventListener("click", () => deleteTask(task.id));

            // Append the created list item to the task list
            taskList.appendChild(li);
        });
    };

    // Function to add a new task
    const addTask = () => {
        // Get the task name from the input field and remove any extra spaces
        const taskName = taskInput.value.trim();

        // Only add the task if it's not empty
        if (taskName) {
            // Get the current list of tasks from localStorage
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            // Create a new task object with a unique ID, name, and default priority of "normal"
            const newTask = { id: Date.now(), name: taskName, priority: "normal" };
            // Add the new task to the list
            tasks.push(newTask);
            // Save the updated task list back to localStorage
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // Reload the task list to display the new task
            loadTasks();
            // Clear the input field
            taskInput.value = "";
        }
    };

    // Function to delete a task
    const deleteTask = (id) => {
        // Get the current list of tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Filter out the task with the specified ID
        const filteredTasks = tasks.filter(task => task.id !== id);
        // Save the updated list back to localStorage
        localStorage.setItem("tasks", JSON.stringify(filteredTasks));
        // Reload the task list
        loadTasks();
    };

    // Function to update the priority of a task
    const updateTaskPriority = (id, newPriority) => {
        // Get the current list of tasks from localStorage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // Map through the tasks and update the priority for the specified task ID
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, priority: newPriority } : task
        );
        // Save the updated task list back to localStorage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    // Add event listener for the "Add Task" button to add new tasks
    addTaskButton.addEventListener("click", addTask);

    // Load and display tasks when the page is loaded
    loadTasks();
});

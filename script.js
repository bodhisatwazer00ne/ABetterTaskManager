// DOM selection
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const pendingTasks = document.querySelector("#pendingTasks");

const clearBtn = document.querySelector("#clearBtn");


let tasks = [];
// Promise — simulates an API request
const fetchTasks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    text: "Learn JavaScript",
                    completed: false
                },
                {
                    id: 2,
                    text: "Practice DOM manipulation",
                    completed: true
                }
            ]);
        }, 1000);
    });
};

// Async/Await
const loadTasks = async () => {
    try {
        tasks = await fetchTasks();
        renderTasks();
    } catch (error) {
        console.log("Error:", error);
    }
};
// Render tasks into the DOM
const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task");

        const taskContent = document.createElement("div");
        taskContent.classList.add("task-content");

        const span = document.createElement("span");

        span.textContent = task.text;
        span.classList.add("task-text");

        if (task.completed) {
            span.classList.add("completed");
        }

        // Arrow function + event listener
        span.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");


        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        // DOM manipulation
        taskContent.appendChild(span);

        li.appendChild(taskContent);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateStats();

};

// Add task
taskForm.addEventListener("submit", (event) => {
    // Prevent page reload
    event.preventDefault();
    const text = taskInput.value.trim();
    if (text === "") {
        return;
    }
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
});

// Toggle completed status
const toggleTask = (id) => {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }
        return task;
    });
    renderTasks();
};

// Delete task
const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();

};

// Clear all tasks
clearBtn.addEventListener("click", () => {
    tasks = [];
    renderTasks();
});

// Update statistics
const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(
        task => task.completed
    ).length;
    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

};
// Start application
loadTasks();


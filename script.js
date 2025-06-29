document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const taskList = document.getElementById("task-list");
  const emptyImage = document.getElementById("empty-list-image");
  const progressFill = document.getElementById("progress-fill");
  const counterBubble = document.getElementById("counter-bubble");
  const sound = document.getElementById("completion-sound");
  const userName = document.getElementById("user-name");

  const user = JSON.parse(localStorage.getItem("userData"));
  if (!user || !user.name || !user.dob) {
    window.location.href = "login.html";
    return;
  } else {
    userName.textContent = user.name;
  }

  let tasks = [];

  const toggleEmptyImage = () => {
    emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const updateProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : (completed / total) * 100;

    progressFill.style.width = `${percent}%`;
    counterBubble.textContent = `${completed} / ${total}`;
    counterBubble.classList.add("pop");
    setTimeout(() => counterBubble.classList.remove("pop"), 150);

    if (total > 0 && completed === total) {
      confetti();
      sound.play();
    }
  };

  const addTaskToDOM = (task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.dataset.id = task.id;

    li.innerHTML = `
      <input type="checkbox" class="task-check" ${task.completed ? "checked" : ""}>
      <span class="task-text ${task.completed ? "task-completed" : ""}">${task.text}</span>
      <div class="action-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    taskList.appendChild(li);
    toggleEmptyImage();
    updateProgress();
  };

  const loadTasks = () => {
    const stored = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = stored.filter(task => typeof task.id === 'number' && typeof task.text === 'string');
    tasks.forEach(addTaskToDOM);
  };

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };

    tasks.push(newTask);
    addTaskToDOM(newTask);
    saveTasks();
    updateProgress();
    todoInput.value = '';
  });

  taskList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const taskId = parseInt(li.dataset.id);
    const task = tasks.find(t => t.id === taskId);


    if (e.target.classList.contains("task-check")) {
      task.completed = e.target.checked;
      const span = li.querySelector(".task-text");
      span.classList.toggle("task-completed", task.completed);
      saveTasks();
      updateProgress();
      return;
    }

    if (e.target.closest(".delete-btn")) {
      li.remove();
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      updateProgress();
      toggleEmptyImage();
      return;
    }

    
    const icon = e.target.closest("button")?.querySelector("i");
    if (e.target.closest(".edit-btn")) {
      if (icon.classList.contains("fa-pen")) {
        const span = li.querySelector(".task-text");
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.text;
        input.classList.add("edit-input");
        span.replaceWith(input);
        input.focus();
        icon.classList.replace("fa-pen", "fa-check");
      } else if (icon.classList.contains("fa-check")) {
        const input = li.querySelector(".edit-input");
        const newText = input.value.trim();
        if (newText) {
          task.text = newText;
          const span = document.createElement("span");
          span.classList.add("task-text");
          if (task.completed) span.classList.add("task-completed");
          span.textContent = newText;
          input.replaceWith(span);
          icon.classList.replace("fa-check", "fa-pen");
          saveTasks();
        }
      }
    }
  });

  loadTasks();
});

document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("userData");
    window.location.href = "login.html";
  });
  

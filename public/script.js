function loadTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      tasks.forEach((task, index) => {
        list.innerHTML += `
          <li>
            ${task.topic} (Strength ${task.strength})
            <button onclick="deleteTask(${index})">❌</button>
          </li>`;
      });
    });
}

function addTask() {
  const topic = document.getElementById("topic").value;
  const strength = document.getElementById("strength").value;
  fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, strength })
  }).then(loadTasks);
}

function deleteTask(id) {
  fetch(`/tasks/${id}`, { method: "DELETE" })
    .then(loadTasks);
}

loadTasks();

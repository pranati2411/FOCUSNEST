let currentSection = '';

function openModal(section) {
  currentSection = section;
  document.getElementById('taskModal').style.display = 'flex';
  document.getElementById('taskInput').value = '';
  document.getElementById('taskDesc').value = '';
}

function closeModal() {
  document.getElementById('taskModal').style.display = 'none';
}

function addTask() {
  const title = document.getElementById('taskInput').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();

  if (!title) return;

  const taskList = currentSection === 'personal' ? document.getElementById('personalTasks') : document.getElementById('workTasks');

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${title}</span>
    <div class="task-actions">
      <button onclick="showDescription('${desc.replace(/'/g, "\\'")}')">👁️</button>
      <button onclick="this.parentElement.parentElement.remove()">❌</button>
    </div>
  `;
  taskList.appendChild(li);

  closeModal();
}

function showDescription(desc) {
  if (!desc) {
    alert('No description provided.');
  } else {
    alert(desc);
  }
}

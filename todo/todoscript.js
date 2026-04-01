function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  const li = document.createElement('li');

  // Left section (checkbox + text)
  const leftDiv = document.createElement('div');
  leftDiv.className = 'task-left';

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  // Task text
  const span = document.createElement('span');
  span.textContent = taskText;

  // Checkbox behavior
  checkbox.onchange = function () {
    span.classList.toggle('completed', checkbox.checked);
  };

  // Append checkbox + text
  leftDiv.appendChild(checkbox);
  leftDiv.appendChild(span);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑';
  deleteBtn.className = 'delete-btn';

  deleteBtn.onclick = function () {
    li.remove();
  };

  // Append to list item
  li.appendChild(leftDiv);
  li.appendChild(deleteBtn);

  document.getElementById('taskList').appendChild(li);

  input.value = '';
}

// Enter key support
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});
document.addEventListener('DOMContentLoaded', () => {
    // Initialize weekly chart
    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const weeklyChart = document.querySelector('.weekly-chart');
    
    weekDays.forEach(day => {
        const progress = Math.random() * 100;
        const dayElement = document.createElement('div');
        dayElement.className = 'day-progress';
        dayElement.innerHTML = `
            <div class="bar" style="height: ${progress}%"></div>
            <div class="day-label">${day}</div>
        `;
        weeklyChart.appendChild(dayElement);
    });

    // Handle task assignment
    const assignBtn = document.querySelector('.assign-btn');
    assignBtn.addEventListener('click', () => {
        const taskText = document.querySelector('.task-input input').value;
        const selectedPerson = document.querySelector('.assign-task select').value;
        
        if (taskText.trim()) {
            console.log(`Assigning task: "${taskText}" to ${selectedPerson}`);
            // Add task to the task list
            addTaskToList(taskText, selectedPerson);
        } else {
            alert('Please enter a task.');
        }
    });

    function addTaskToList(task, person) {
        const taskList = document.querySelector('.task-list');
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        taskItem.innerHTML = `
            <span class="deadline">Assigned to: ${person}</span>
            <span class="status">${task}</span>
        `;
        taskList.appendChild(taskItem);
    }
});
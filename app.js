// Access createClient from the Supabase CDN
const createClient = window.supabase.createClient;

// Initialize Supabase client
const SUPABASE_URL = 'OMGITSASECRET'; // Replace with your Supabase URL
const SUPABASE_KEY = 'OMGITSASECRET'; // Replace with your Supabase API key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to create a task
async function createTask(name, details, dueDate) {
    const { data, error } = await supabase
        .from('tasks')
        .insert([{ name, details, due_date: dueDate }]);

    if (error) {
        console.error('Error creating task:', error);
    } else {
        console.log('Task created:', data);
    }
}

// Function to read tasks
async function getTasks() {
    const { data, error } = await supabase
        .from('tasks')
        .select('*');

    if (error) {
        console.error('Error fetching tasks:', error);
    } else {
        console.log('Tasks fetched:', data);
        return data;
    }
}

// Function to update a task
async function updateTask(id, updates) {
    const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('Error updating task:', error);
    } else {
        console.log('Task updated:', data);
    }
}

// Function to delete a task
async function deleteTask(id) {
    const { data, error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting task:', error);
    } else {
        console.log('Task deleted:', data);
    }
}
// Function to populate the dropdown with tasks
async function populateTasksDropdown() {
    const tasks = await getTasks();
    const dropdown = document.getElementById('recipeDropdown');
    dropdown.innerHTML = '<option value="">Select a task</option>';
    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task.id;
        option.textContent = task.name;
        dropdown.appendChild(option);
    });
}

async function displayTaskDetails() {
    const dropdown = document.getElementById('recipeDropdown');
    const taskId = dropdown.value;
    if (!taskId) return;

    const tasks = await getTasks();
    const task = tasks.find(t => t.id == taskId);
    const detailsDiv = document.getElementById('recipeDetails');
    detailsDiv.innerHTML = `
        <h3>${task.name}</h3>
        <p>${task.details}</p>
        <p>Due Date: ${task.due_date}</p>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="updateTask(${task.id}, { name: 'Updated Task Name' })">Update</button>
    `;
}

populateTasksDropdown();

// Attach event listener to dropdown
const dropdown = document.getElementById('recipeDropdown');
dropdown.addEventListener('change', displayTaskDetails);

// Attach functions to the window object to make them globally accessible
window.createTask = createTask;
window.getTasks = getTasks;
window.updateTask = updateTask;
window.deleteTask = deleteTask;
window.populateTasksDropdown = populateTasksDropdown;
window.displayTaskDetails = displayTaskDetails;
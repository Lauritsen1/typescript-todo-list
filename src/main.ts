import { v4 as uuidv4 } from 'uuid';

const form = document.querySelector<HTMLFormElement>('.form');
const input = document.querySelector<HTMLInputElement>('.input');
const list = document.querySelector<HTMLUListElement>('.list');
const tasks: Task[] = loadTasks();

type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

form?.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input?.value == '' || input?.value == null) return;

    const newTask: Task = {
        id: uuidv4(),
        title: input.value,
        completed: false,
        createdAt: new Date(),
    };

    tasks.push(newTask);
    saveTasks();

    addListItem(newTask);
    input.value = '';
});

function addListItem(task: Task) {
    const listItem = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks();
    });
    checkbox.type = 'checkbox';

    label.append(checkbox, ' ' + task.title);
    listItem.append(label);
    list?.append(listItem);
}

function saveTasks() {
    localStorage.setItem('TASK', JSON.stringify(tasks));
}

function loadTasks() {
    const taskJSON = localStorage.getItem('TASKS');
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
}

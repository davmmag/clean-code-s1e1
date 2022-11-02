const BTN_ADD = document.querySelector('.btn--add');
const INPUT_ADD = document.querySelector('.add-section__input');
const INCOMPLETE_LIST = document.querySelector('.list--incomplete');
const LIST_ITEMS = document.querySelectorAll('.list__item');
const COMPLETE_LIST = document.querySelector('.list--complete');
let value = INPUT_ADD.value;
INPUT_ADD.addEventListener('input', () => value = INPUT_ADD.value);

const createNewTask = (value) => {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const inputText = document.createElement('input')
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    const deleteImg = document.createElement('img');

    listItem.className = 'list__item';
    checkBox.type = 'checkbox';
    checkBox.className = 'input input--checkbox';
    label.className = 'label-task';
    label.textContent = value;
    inputText.type = 'text';
    inputText.className = 'task input input--text input--hidden';
    btnEdit.className = 'btn btn--edit';
    btnEdit.textContent = 'Edit';
    btnDelete.className = 'btn btn--delete';
    deleteImg.src = './remove.svg';
    deleteImg.alt = 'Remove';
    deleteImg.className = 'btn__img';
    btnDelete.append(deleteImg);
    listItem.append(checkBox, label, inputText, btnEdit, btnDelete);
    return listItem;
}

const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    const checkBox = taskListItem.querySelector('.input--checkbox');
    const BTN_EDIT = taskListItem.querySelector('.btn--edit');
    const BTN_DELETE = taskListItem.querySelector('.btn--delete');

    BTN_EDIT.addEventListener('click', editTask);
    BTN_DELETE.addEventListener('click', deleteTask);
    checkBox.addEventListener('click', checkBoxEventHandler);
}

const addTask = (value) => {
    const listItem = createNewTask(value);
    INCOMPLETE_LIST.append(listItem);
    bindTaskEvents(listItem, completeTask);
    INPUT_ADD.value = '';
}

const editTask = (e) => {
    const listItem = e.target.parentNode;
    const inputText = listItem.querySelector('.input--text');
    const btnEdit = listItem.querySelector('.btn--edit');
    const label = listItem.querySelector('.label-task');

    if (listItem.classList.contains('list__item--edit')) {
        listItem.classList.remove('list__item--edit');
        inputText.classList.add('input--hidden');
        label.textContent = inputText.value;
        label.classList.remove('label-task--hidden');
        btnEdit.textContent = 'Edit';
    } else {
        listItem.classList.add('list__item--edit');
        inputText.classList.remove('input--hidden');
        inputText.value = label.textContent;
        label.classList.add('label-task--hidden');
        btnEdit.textContent = 'Save';
    }
}

const deleteTask = (e) => {
    const listItem = e.target.closest('.list__item');
    const list = listItem.parentNode;
    list.removeChild(listItem);
}

const completeTask = (e) => {
    const listItem = e.target.parentNode;
    const list = listItem.parentNode;
    if (list.classList.contains('list--incomplete')) {
        COMPLETE_LIST.append(listItem);
    } else {
        INCOMPLETE_LIST.append(listItem);
    }
}

for (let item of LIST_ITEMS) {
    bindTaskEvents(item, completeTask);
}

BTN_ADD.addEventListener('click', () => {
    if (value.length !== 0) addTask(value);
});
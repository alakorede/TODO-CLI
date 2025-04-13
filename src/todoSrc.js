const fileManager = require("./fileManager");

function consoleHelpText() {
    const helpMessage = `
            ToDo CLI - Command-line task manager

            Usage:
            todocli                   Display the full list of ToDos
            todocli [option] [index]  Perform an action based on the provided option and index

            Options:
            -a, --add [description]
                                    Add a new ToDo with the given description
            -c, --check [index]    Mark the ToDo at the specified index as completed
            -e, --edit [index] [description]
                                    Edit the ToDo at the specified index
            -h, --help             Show this help menu
            -r, --remove [index]   Remove the ToDo at the specified index
            -s, --search [term]    Search and display ToDos containing the given term
            -si, --search-index [term]
                                    Search and display the first ToDo index containing the given term
            -u, --uncheck [index]  Unmark the ToDo at the specified index as completed

            --clean-all            Clean Todo List
            --check-all            Mark all ToDos as completed
            --uncheck-all          Unmark all ToDos as completed

            Examples:
            todocli                             → Displays all ToDos
            todocli -a "Study NodeJS"           → Adds a new ToDo
            todocli -c 2                        → Marks the ToDo at index 2 as completed
            todocli --check-all                 → Marks all ToDos as completed
            todocli -e 1 "Study Rust"           → Edits the ToDo at index 1

            Note:
            Indexes start at 1 and are based on the current list.
            `;

    process.stdout.write(helpMessage);
    return;
}

async function createTodo(todoDescription) {
    const todoAdded = await fileManager.insertData(todoDescription);
    if (todoAdded) {
        return todoAdded;
    } else {
        return false;
    }
}

async function removeTodo(todoIndex) {
    let index = todoIndex - 1;
    const todoRemoved = await fileManager.removeData(index);
    if (todoRemoved) {
        return todoRemoved;
    } else {
        return false;
    }
}

async function checkTodo(todoIndex) {
    const index = parseInt(todoIndex, 10) - 1;
    const todoChecked = await fileManager.updateData(index, null, true);

    if (todoChecked) {
        return todoChecked;
    } else {
        return false;
    }
}

async function uncheckTodo(todoIndex) { 
    const index = parseInt(todoIndex, 10) - 1;
    const todoUnchecked = await fileManager.updateData(index, null, false);
    if (todoUnchecked) {
        return todoUnchecked;
    } else {
        return false;
    }
}

async function editTodo(todoIndex) {
    const index = parseInt(todoIndex, 10) - 1;
    const todoEdited = await fileManager.updateData(index, true, null);
    if (todoEdited) {
        return todoEdited;
    } else {
        return false;
    }
}

async function checkAllTodo() {
    let todoList = await fileManager.getData();
    if (!todoList) {
        return false;
    }
    for (let i = 0; i < todoList.length; i++) {
        await fileManager.updateData(i , null, true);
    }
    return true;
}

async function uncheckAllTodo() {
    let todoList = await fileManager.getData();
    if (!todoList) {
        return false;
    }
    for (let i = 0; i < todoList.length; i++) {
        await fileManager.updateData(i, null, false);
    }
    return true;
}

async function showTodoList(todoList){
    let todoArray = todoList ? typeof todoList === "object" ? todoList : JSON.parse(todoList)  : await fileManager.getData();

    if (!Array.isArray(todoArray) || todoArray.length === 0) {
        process.stdout.write( '=== ToDo List ===\n\n  No tasks found.');
        return;
    }

    const header = '=== ToDo List ===\n\n';
    const tableHeader = '| Index |   Status   | Description             |\n' +
        '|-------|------------|-------------------------|';

    const rows = todoArray.map((item, index) => {
        const status = item.status === true ? 'Done' : '    ';
        const desc = item.Description.padEnd(26, ' ');
        return `|  ${String(index + 1).padEnd(4)} |    ${status}    | ${desc}`;
    });

    process.stdout.write(`${header}${tableHeader}\n${rows.join('\n')}`);

    return
}

async function searchTodoIndex(){

}

async function searchTodo(){

}

async function clearList() {
    const cleanList = await fileManager.cleanData();
    if (cleanList) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    consoleHelpText,
    createTodo,
    removeTodo,
    checkTodo,
    uncheckTodo,
    editTodo,
    showTodoList,
    uncheckAllTodo,
    checkAllTodo,
    searchTodo,
    searchTodoIndex,
    clearList
}
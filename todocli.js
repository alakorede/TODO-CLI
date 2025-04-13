const todoSrc       = require("./src/todoSrc");
const interaction   = require("./src/interaction");

async function main(){
    switch (process.argv[2]) {
        case "-h":
        case "--help": {
            todoSrc.consoleHelpText();
            break;
        }
        case "-a":
        case "--add": {
            let todoDescription = await interaction.askQuestion("Enter the description for the new ToDo: ");

            if (!todoDescription) {
                console.error("Error: You must provide a description to create a new ToDo.");
            } else {
                const newTodo = await todoSrc.createTodo(todoDescription);
                if (newTodo) {
                    process.stdout.write(`ToDo added: ${todoDescription} \n`);
                    todoSrc.showTodoList(newTodo);
                } else {
                    console.error("Error: Unable to add new ToDo, try again later.");
                }
            }
            break
        }
        case "-c":
        case "--check": {
            const todoIndex = process.argv[3];
            if (!todoIndex) {
                console.error("Error: You must provide a ToDo index to be checked");
            } else {
                const checkTodo = await todoSrc.checkTodo(todoIndex);
                if (checkTodo) {
                    process.stdout.write(`ToDo checked: ${todoIndex} \n`);
                    todoSrc.showTodoList(checkTodo);
                } else {
                    console.error("Error: Unable to check ToDo, try again later.");
                }
            }
            break;
        }
        case "-e":
        case "--edit": {
            const todoIndex = process.argv[3];

            if (!todoIndex) {
                console.error("Error: You must provide a ToDo index to be edited.");
            } else {
                const editTodo = todoSrc.editTodo(todoIndex);
                if (editTodo) {
                    process.stdout.write(`ToDo Edited successfully \n`);
                    todoSrc.showTodoList();
                } else {
                    console.error("Error: Unable to edit ToDo, try again later.");
                }
            }
            break;
        }
        case "-r":
        case "--remove": {
            const todoIndex = process.argv[3];
            if (!todoIndex) {
                console.error("Error: You must provide ToDo index to be removed");
            } else {
                const removeTodo = await todoSrc.removeTodo(todoIndex);
                if (removeTodo) {
                    process.stdout.write(`ToDo removed successfully \n`);
                    todoSrc.showTodoList(removeTodo);
                } else {
                    console.error("Error: Unable to remove ToDo, try again later.");
                }
            }
            break;
        }
        case "-s":
        case "--search": {
            const searchTerm = process.argv[3];
            if (!searchTerm) {
                console.error("Error: You must provide a search term to search for.");
            } else {
                const searchResult = todoSrc.searchTodo(searchTerm);
                if (searchResult) {
                    process.stdout.write(`Search result: ${searchResult} \n`);
                } else {
                    console.error("Error: None ToDo could be found in the list");
                }
            }
            break;
        }
        case "-si":
        case "--search-index": {
            const searchTerm = process.argv[3];
            if (!searchTerm) {
                console.error("Error: You must provide a search term to search for.");
            } else {
                const searchResult = todoSrc.searchTodoIndex(searchTerm);
                if (searchResult) {
                    process.stdout.write(`First index related: ${searchResult} \n`);
                } else {
                    console.error(`Error: Nothing found with ${searchTerm}`);
                }
            }
            break;
        }
        case "-u":
        case "--uncheck": {
            const todoIndex = process.argv[3];
            if (!todoIndex) {
                console.error("Error: You must provide a ToDo index to be unchecked");
            } else {
                const uncheckTodo = await todoSrc.uncheckTodo(todoIndex);
                if (uncheckTodo) {
                    process.stdout.write(`ToDo unchecked: ${todoIndex} \n`);
                    todoSrc.showTodoList(uncheckTodo);
                } else {
                    console.error("Error: Unable to uncheck ToDo, try again later.");
                }
            }
            break;
        }
        case "--check-all": {
            const checkAll = await todoSrc.checkAllTodo();
            if (checkAll) {
                process.stdout.write(`All ToDo checked successfully \n`);
                todoSrc.showTodoList();
            } else {
                console.error("Error: Unable to check entire ToDo list");
            }
            break;
        }
        case "--uncheck-all": {
            const uncheckAll = await todoSrc.uncheckAllTodo();
            if (uncheckAll) {
                process.stdout.write(`All ToDo unchecked successfully \n`);
                todoSrc.showTodoList();
            } else {
                console.error("Error: Unable to uncheck entire ToDo list");
            }
            break;
        }
        case "--clean-all": {
            const clearList = await todoSrc.clearList();
            if (clearList) {
                let cleanListModel = [];
                process.stdout.write(`ToDo List Full Clear successfully \n`);
                todoSrc.showTodoList(cleanListModel);
            } else {
                console.error("Error: Unable to clear ToDo list");
            }
            break
        }
        default: {
            const userInput = process.argv[2];
            if (userInput) {
                console.error(`Error: Operation ${userInput} does not exist, run this CLI with -h or --help to see accepted operations`);
                return;
            } else {
                todoSrc.showTodoList();
            }
        }
    }
}

main();
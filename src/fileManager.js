const fs                = require("fs/promises");
const filePath          = "./data/data.json";



async function getData() {
    try {
        const fileData = await fs.readFile(filePath, 'utf8');
        return fileData;
    } catch (error){
        process.stdout.write(`Data File was not found, creating new DataFile \n`);
        const firstContent = []
        await fs.writeFile(filePath, JSON.stringify(firstContent, null, 2));
        const fileData = await fs.readFile(filePath, 'utf8');
        if (fileData) {
            process.stdout.write(`Data File created and ready to use \n\n`);
        } else {
            process.stdout.write(`Error creating Data File \n`);
        }
        return;
    }
}

async function insertData(data) {
    try{
        const todoObject = {
            "status": false,
            "Description": data,
        }
        let fileData = await fs.readFile(filePath, 'utf8');
        if(fileData) {
            let dataObject = JSON.parse(fileData);
            dataObject.push(todoObject);
            await fs.writeFile(filePath, JSON.stringify(dataObject, null, 2));
            const todoAdded = await fs.readFile(filePath, 'utf8');
            return todoAdded;
        } else {
            return false;
        }
        
    } catch (error) {
        const todoObject = []
        await fs.writeFile(filePath, JSON.stringify(todoObject, null, 2));
        console.log("Database was not found, fail threated and normalized. Please, add your ToDo again");
    }
}

async function removeData(index){
    try {

    } catch (error){

    }
}

async function updateData(index, data, status) {
    try{

    } catch (error){

    }
}

module.exports ={
    insertData,
    removeData,
    updateData,
    getData
}
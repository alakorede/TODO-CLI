const fs                = require("fs/promises");
const interaction       = require("./interaction");
const filePath          = "./data/data.json";



async function getData() {
    try {
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData);
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
        const fileData = await fs.readFile(filePath, 'utf8');
        if(fileData) {
            let dataObject = JSON.parse(fileData);
            dataObject.splice(index, 1);
            await fs.writeFile(filePath, JSON.stringify(dataObject, null, 2));
            const todoRemoved = await fs.readFile(filePath, 'utf8');
            return todoRemoved;
        } else {
            return false;
        }
    } catch (error){
        const todoObject = []
        await fs.writeFile(filePath, JSON.stringify(todoObject, null, 2));
        console.log("Database was not found, fail threated and normalized.");
    }
}

async function updateData(index, data, status) {
    try{
        if (index !== undefined && index !== null && !data && status !== undefined && status !== null) {
            let fileData = JSON.parse(await fs.readFile(filePath, 'utf8'));
            if (status === true) {
                fileData[index].status = true;
                await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
                return fileData;
            } else {
                fileData[index].status = false;
                await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
                return fileData;
            }
        } else if (index && data) {
            let todoDescription = await interaction.askQuestion(`Enter the new description for Todo ${index} `);
            if (!todoDescription) {
                console.error("Error: New Description not provided, the Todo will be kept");
            } else {
                let fileData = JSON.parse(await fs.readFile(filePath, 'utf8'));
                fileData[index].Description = todoDescription;
                await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
                return fileData;
            }
        }
    } catch (error){

    }
}

async function cleanData() {
    try {
        fileData = [];
        await fs.writeFile(filePath, JSON.stringify(fileData, null, 2));
        return true
    } catch (error) {
        console.error(`ERROR: Unable do clean List! \n`);
    }
}

async function findData(searchTerm) {
    try {
        let fileData = JSON.parse(await fs.readFile(filePath, 'utf8'));
        let filteredData = await fileData.filter(item => item.Description.toLowerCase().includes(searchTerm.toLowerCase()));
        return filteredData
    } catch (error) {
        console.error(`ERROR: Unable to find ${searchTerm} \n`);
    }
}

module.exports ={
    insertData,
    removeData,
    updateData,
    getData,
    cleanData,
    findData
}
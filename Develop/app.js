const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const writeFileAsync = util.promisify(fs.writeFile)

//Assiging empty array to push types of employees
const employees = []

// Code using inquirer to gather information about the Manager,and creating objects for manager
const askManagerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "👤 What is Manager Name:",
            name: "name"
        },

        {
            type: "input",
            message: "What is Manager  Id",
            name: "id"
        },

        {
            type: "input",
            message: "What is Manager EmailAddress",
            name: "email"
        },
        {
            type: "input",
            message: "What is Manager officeNumber",
            name: "officeNumber"
        }
    ]).then(managerOutput => {
        employees.push(new Manager(managerOutput.name, managerOutput.id, managerOutput.email, managerOutput.officeNumber))
        addEmployee();
    })
}

//Ask whether employee type is Engineer or Intern or want to exit
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Please choose your employee type to create",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Exit"
            ]
        },
    ]).then(addEmployee => {

        console.log(addEmployee)
        if (addEmployee.role === "Engineer") {
            engineerQuestions()
        }
        else if (addEmployee.role === "Intern") {
            internQuestions()
        }
        else if (addEmployee.role === "Exit") {
            // After the user has input all employees desired, call the `render` function 
            renderHtml()
        }
    })
}

// Code using inquirer to gather information about the Engineer,and creating objects for Engineer
const engineerQuestions = () => {
    return inquirer.prompt([

        {
            type: "input",
            message: "👤 What is Engineer Name:",
            name: "name"
        },

        {
            type: "input",
            message: "What is Engineer  Id",
            name: "id"
        },

        {
            type: "input",
            message: "What is Engineer EmailAddress",
            name: "email"
        },
        {
            type: "input",
            message: "👤 What is Engineer Github address:",
            name: "gitHub"
        },
    ]).then(engineerAnswer => {
        employees.push(new Engineer(engineerAnswer.name, engineerAnswer.id, engineerAnswer.email, engineerAnswer.gitHub))
        addEmployee();
    })
}


// Code using inquirer to gather information about the Intern,and creating objects for Intern
const internQuestions = () => {
    return inquirer.prompt([

        {
            type: "input",
            message: "👤 What is Intern Name:",
            name: "name"
        },

        {
            type: "input",
            message: "What is Inter  Id",
            name: "id"
        },

        {
            type: "input",
            message: "What is Inter  EmailAddress",
            name: "email"
        },
        {
            type: "input",
            message: "👤 What is Intern School:",
            name: "school"
        },
    ]).then(internAnswer => {
        employees.push(new Intern(internAnswer.name, internAnswer.id, internAnswer.email, internAnswer.school))
        addEmployee();
    })
}

// check if the `output` folder exists and create it if it does not.
function renderHtml() {
    const outputData = render(employees);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        writeFileAsync(outputPath, outputData)
    }
    else {
        writeFileAsync(outputPath, outputData);
    }
}

init()
//Inititalzing program to start
function init() {
    askManagerQuestions();
}
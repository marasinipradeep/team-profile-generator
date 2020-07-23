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

// General questions
const askGeneralQuestions = [
    {
        type: "input",
        message: "👤 What is Team Name:",
        name: "name"
    },

    {
        type: "input",
        message: "What is Team  Id",
        name: "id"
    },

    {
        type: "input",
        message: "What is Team EmailAddress",
        name: "email"
    }
]

//Questions specific to manager
const askManagerQuestion = {
    type: "input",
    message: "What is Manager officeNumber",
    name: "officeNumber"
}

//Questions specific to engineer
const askEngineerQuestions = 
    {
        type: "input",
        message: "👤 What is Engineer Github address:",
        name: "gitHub"
    }

//Questions specific to intern
const askInternQuestions = 
    {
        type: "input",
        message: "👤 What is Intern School:",
        name: "school"
    }


// Code using inquirer to gather information about the Manager,and creating objects for manager
const askManagerQuestions = () => {

    //Array spread method and again putting back into single array
   return inquirer.prompt([...askGeneralQuestions, askManagerQuestion])
        .then(managerOutput => {
            
            //Object destructred 
            const {name,id,email,officeNumber}=managerOutput
            employees.push(new Manager(name, id, email, officeNumber))
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
    //Array spread method and again putting back into single array
   return  inquirer.prompt([...askGeneralQuestions, askEngineerQuestions])
        .then(engineerOutput=> {
            //Object destructure
            const {name,id,email,gitHub}=engineerOutput
            employees.push(new Engineer(name,id,email,gitHub))
            addEmployee();
        })
}


// Code using inquirer to gather information about the Intern,and creating objects for Intern
const internQuestions = () => {
    //Array spread method and again putting back into single array
    return inquirer.prompt([...askGeneralQuestions, askInternQuestions])
        .then(internOutput => {

               //Object destructred 
            const {name,id,email,school}=internOutput
            employees.push(new Intern(name, id, email, school))
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
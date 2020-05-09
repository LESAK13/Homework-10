const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

var questions = [
    {
        type: "input",
        message: "What is his/her name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is his/her id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is his/her e-mail?",
        name: "email",
    },
    {
        type: "list",
        message: "What is his/her role?",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: "input",
        message: "What is his/her office number?",
        name: "office",
        when: (answers) => answers.role === "Manager"
    },
    {
        type: "input",
        message: "What is his/her github ID?",
        name: "github",
        when: (answers) => answers.role === "Engineer"
    },
    {
        type: "input",
        message: "What school does he/she attend?",
        name: "school",
        when: (answers) => answers.role === "Intern"
    }
]

var addPrompt = {
    type: 'confirm',
    name: 'add',
    message: 'Would you like to add a team member?'
};

function addMember() {
    inquirer.prompt(addPrompt).then(answers => {
        if (answers.add) {
            memberInfo()
        } else {
            console.log("Adding team members complete");
            fs.writeFile(outputPath, render(employees), err => {
                if (err) throw err;
            }
            )
        }
    })
}

function memberInfo() {
    inquirer.prompt(questions).then(answers => {
        var newEmployee
        if (answers.role === "Manager") {
            newEmployee = new Manager(answers.name, answers.id, answers.email, answers.office);
        } else if (answers.role === "Engineer") {
            newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.github);
        } else if (answers.role === "Intern") {
            newEmployee = new Intern(answers.name, answers.id, answers.email, answers.school);
        }
        employees.push(newEmployee);
    }).then(addMember);
};

addMember();



















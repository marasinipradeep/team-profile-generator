const path = require("path");
const fs = require("fs");
const util = require("util")

const templatesDir = path.resolve(__dirname, "../templates");

//
const outputDir = path.resolve(__dirname, "../output")
const writeFileAsync = util.promisify(fs.writeFile)
//

const render = employees => {
  console.log(`Inside render employees ${employees}`)
  const html = [];
  html.push(employees)
  console.log(`Inside render employees  html push ${html}`)
  html.filter(employee => {
    if (employee.getRole() === "Manager") {
      console.log("Yes I am manager")
      html.map(manager => renderManager(manager))
    } else {
      console.log("I am not a manager")
    }
  })

  // html.push(employees
  //   .filter(employee => employee.getRole() === "Manager")
  //   .map(manager => renderManager(manager))
  // );
  // html.push(employees
  //   .filter(employee => employee.getRole() === "Engineer")
  //   .map(engineer => renderEngineer(engineer))
  // );
  // html.push(employees
  //   .filter(employee => employee.getRole() === "Intern")
  //   .map(intern => renderIntern(intern))
  // );

  console.log(`After generating html file before render main`)
  console.log(`After generating html file before render main ${renderMain(html.join(""))}`)
  


  //
  //

  return renderMain(html.join(""));

};

const renderManager =async manager => {
  console.log(`I am renderManager ${manager}`)
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  console.log(`I am renderManager template : ${template}`)
  //
  let teamHTML = template

  if (!fs.existsSync(outputDir)) {
    console.log(`Making Directory`)
    fs.mkdirSync(outputDir);
    await writeFileAsync("./output/team.html", teamHTML)
  }else
  {
    await writeFileAsync("./output/team.html", teamHTML)

  }
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;

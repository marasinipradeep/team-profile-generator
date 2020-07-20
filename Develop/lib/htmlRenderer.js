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
      html.map(async manager =>{
        console.log(`line 21 html.map manager ${manager}`)
       // renderManager(manager)
      
      
  if (!fs.existsSync(outputDir)) {
    console.log(`Making Directory`)
    fs.mkdirSync(outputDir);
    await writeFileAsync("./output/team.html", renderMain(renderManager(manager)))
  } else {
    await writeFileAsync("./output/team.html", renderMain(renderManager(manager)))

  }
  } )

        
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

  console.log("line 43")
  console.log(html)



  return renderMain(html.join(""));

};

const renderManager = manager => {
  console.log(`line 64 I am renderManager ${manager}`)
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  console.log(`line 62 template renderManager ${template}`)

  template = replacePlaceholders(template, "name", manager.getName());
  console.log(`line 67  htmlrender.js ${manager.getName}`)
  
  template = replacePlaceholders(template, "role", manager.getRole());
  console.log(`line 69  htmlrender.js ${manager.getRole()}`)
  template = replacePlaceholders(template, "email", manager.getEmail());
  console.log(`line 71  htmlrender.js ${manager.getEmail()}`)
  template = replacePlaceholders(template, "id", manager.getId());
  console.log(`line 73  htmlrender.js ${manager.getId()}`)
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  console.log(`line 75  htmlrender.js ${manager.getOfficeNumber()}`)
  console.log(`I am renderManager template : ${template}`)
  console.log(template)
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
  console.log(`inside line 105 render main ${html}`)
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  console.log(`inside line 107`)
  console.log(template)
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  console.log(`inside line 113 replacePlaceHolder  ${value}`)
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;

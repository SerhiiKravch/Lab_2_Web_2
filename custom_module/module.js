//Необхідні файли
const customer = require("./customer");
const performer = require("./performer");
const project = require("./project");
const projects_in_progress = require("./projects_in_progress");

//Необхідні модулі


exports.find_Customer   = customer.find_Customer;
exports.add_Customer    = customer.add_Customer;
exports.edit_Customer   = customer.edit_Customer;
exports.remove_Customer = customer.remove_Customer;
exports.get_Customers_list  = customer.get_Customers_list;

exports.find_Performer   = performer.find_Performer;
exports.add_Performer    = performer.add_Performer;
exports.edit_Performer   = performer.edit_Performer;
exports.remove_Performer = performer.remove_Performer;
exports.get_Performers_list  = performer.get_Performers_list;

exports.find_Project   = project.find_Project;
exports.add_Project    = project.add_Project;
exports.edit_Project   = project.edit_Project;
exports.remove_Project = project.remove_Project;
exports.get_Projects_list  = project.get_Projects_list;


exports.find_Project_in_progress      = projects_in_progress.find_Project_in_progress;
exports.add_Project_in_progress       = projects_in_progress.add_Project_in_progress;
exports.remove_Project_in_progress    = projects_in_progress.remove_Project_in_progress;
exports.edit_Project_in_progress      = projects_in_progress.edit_Project_in_progress;
exports.get_Project_in_progress = projects_in_progress.get_Project_in_progress;

//тест

customer.add_Customer('Oleg', 98644, 100000);
customer.add_Customer('Ivan', 92341, 20000);
customer.add_Customer('Orest', 12314, 9000);
customer.add_Customer("Thomas", 11111, 2000000);
customer.get_Customers_list();
customer.remove_Customer("Thomas", 11111, 2000000);
customer.edit_Customer('Orest', 12314, 9000, "YaYebu", 1231, 999999);
customer.get_Customers_list();

console.log(customer.find_Customer('Oleg', 98644, 100000));

performer.add_Performer("Vivat", 91232, "2 years ", 150);
performer.add_Performer("Arun", 91122, "10 years ", 100);
performer.get_Performers_list();
performer.remove_Performer("Arun", 91122, "10 years ", 100);
performer.edit_Performer("Vivat", 91232, "2 years ", 150, "Iraan", 12342, "10 years ", 3000);
performer.get_Performers_list();

project.add_Project("New era", 344, "A destination for nature", customer.find_Customer('Oleg', 98644, 100000));
project.get_Projects_list(customer.find_Customer('Oleg', 98644, 100000));
project.edit_Project("New era", 344, "A destination for nature", customer.find_Customer('Oleg', 98644, 100000), "Old Time", 1255, "A recognition of old era");
project.get_Projects_list(customer.find_Customer('Oleg', 98644, 100000));
project.remove_Project("Old Time", 1255, "A recognition of old era", customer.find_Customer('Oleg', 98644, 100000));
project.get_Projects_list(customer.find_Customer('Oleg', 98644, 100000));

projects_in_progress.add_Project_in_progress("New era", "10.12.2004", "11.7.2008" , performer.find_Performer("Iraan", 12342, "10 years ", 3000));
projects_in_progress.get_Project_in_progress(performer.find_Performer("Iraan", 12342, "10 years ", 3000));
projects_in_progress.edit_Project_in_progress("New era", "10.12.2004", "11.7.2008" , performer.find_Performer("Iraan", 12342, "10 years ", 3000), "Old Time", "12.12.2009", "30.10.2012");
projects_in_progress.get_Project_in_progress(performer.find_Performer("Iraan", 12342, "10 years ", 3000));
projects_in_progress.remove_Project_in_progress("Old Time", "12.12.2009", "30.10.2012", performer.find_Performer("Iraan", 12342, "10 years ", 3000));
projects_in_progress.get_Project_in_progress(performer.find_Performer("Iraan", 12342, "10 years ", 3000));


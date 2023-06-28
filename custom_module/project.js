class Project{
    
    constructor(name, number, description){
        this.name = name;
        this.number= number;
        this.description = description;
        this.projects_in_progress_list = [];

        if (typeof name === 'undefined') { this.name = "Невідомий проект"; }

    }
    
}

    let global_projects_list = new Array;

function add_Project (name, number, description, customer){

    let project = new Project(name, number, description);
    customer.projects_list.push(project);

    return customer;

}

function find_Project (name, number, description, customer){

    for (let id = 0; id < customer.projects_list.length; id++) {

            let project = customer.projects_list[id];

        if (project.name === name && project.number === number && project.description === description) { return project; }

    }

    return -1;

}

function edit_Project (name, number, description,customer, new_name, new_number, new_description){

        let project = find_Project(name, number, description, customer);

        if (project === -1) { return -1; };

        let id = customer.projects_list.indexOf(project);


           customer.projects_list[id].name = new_name;
            customer.projects_list[id].number = new_number;
            customer.projects_list[id].description = new_description;
         

            return 1;
}




function remove_Project (name, number, description, customer){

    let project = find_Project(name, number, description, customer)

    if (project === -1) { return -1; }
    
    let id = customer.projects_list.indexOf(project);
    customer.projects_list.splice(id, 1);

    return 1;

}

function get_Projects_list(customer) {

    console.log("\n" + `Список всіх проектів замовника ${customer.name}`);

    for (let id = 0; id < customer.projects_list.length; id++) {

        let proj = customer.projects_list[id];
        console.log(`Імʼя проекту: ${proj.name} , код проекту: ${proj.number}, опис проекту: ${proj.description}`);
    }

    console.log();
    
    return customer.projects_list;
}



exports.find_Project   = find_Project;
exports.add_Project    = add_Project;
exports.edit_Project   = edit_Project;
exports.remove_Project = remove_Project;
exports.get_Projects_list  = get_Projects_list;
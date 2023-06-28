class Customer {

    constructor (name, code, budget) {
    
        this.name = name;
        this.code = code;
        this.budget = budget;
        this.projects_list = [];
    
        if (typeof name === 'undefined') { this.name = "Невідомий замовник"; }
    
    }
    
}

let global_customers_list = new Array();

function add_Customer (name, code, budget){

    let customer = new Customer(name, code, budget);
    global_customers_list.push(customer);

    return customer;

}

function find_Customer (name, code, budget){

    for (let customer of global_customers_list){

        if (name === customer.name &&
             code === customer.code &&
              budget === customer.budget) { return customer; }

    }

    return -1;

}

function remove_Customer ( name, code, budget){

    for (let id = 0; id < global_customers_list.length; id++) {

        let customer = global_customers_list[id];

        if (customer.name === name && customer.code === code && customer.budget === budget) { global_customers_list.splice(id, 1);
                                                                                            return 1;}
    }

    return -1;

}

function edit_Customer ( name, code, budget, new_name, new_code, new_budget) {

    for (let id = 0; id < global_customers_list.length; id++) {

        let customer = global_customers_list[id];

        if (customer.name === name && customer.code === code && customer.budget === budget)

        {global_customers_list[id].name = new_name;
         global_customers_list[id].code = new_code;
         global_customers_list[id].budget = new_budget;
         return 1;}

}

return -1;

}

function get_Customers_list() {

    console.log("\n" + "Список всіх замовників:");

    for (let id = 0; id < global_customers_list.length; id++) {

        let cust = global_customers_list[id];
        console.log(`Імʼя замовника: ${cust.name} , код замовника: ${cust.code}, бюджет замовника: ${cust.budget}`);
    }

    console.log();
    
    return global_customers_list;
}

exports.find_Customer   = find_Customer;
exports.add_Customer    = add_Customer;
exports.edit_Customer   = edit_Customer;
exports.remove_Customer = remove_Customer;
exports.get_Customers_list  = get_Customers_list;
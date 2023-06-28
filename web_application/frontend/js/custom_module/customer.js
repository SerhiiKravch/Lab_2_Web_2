let last_customer_id = 0;
let customers_list = new Array();

class Customer  {

    constructor (name, budget, id) {

        this.name = name;
        this.budget = budget;
        this.id = id;

        if ( id === "" ||
             typeof id      === 'undefined') {this.id       = ++last_customer_id;   }

        if ( name === "" ||
        typeof name      === 'undefined') {this.name       = "Невідомий замовник";  }
        
        if ( budget === "" ||
             typeof budget      === 'undefined') {this.budget       = "Невідомий бюджет";   }

    }

}

function add_customer (name, budget, id) {
    
    let customer = new Customer(name, budget , id);
    customers_list.push(customer);

    return customer;
}

function remove_customer( id) {

    for (let z = 0; z < customers_list.length; z++) {

        let customer = customers_list[z];
        if(customer.id === id ) {customers_list.splice(z, 1);
                                    return 1; }
    }

    return -1;

}

function get_customers_list()
    { return customers_list; }

function set_customers_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data){
        add_customer(element.name,
                     element.budget,
                     element.id,);
    }
}

function get_customer_by_id (id) {

    for (let z = 0; z < customers_list.length; z++) {

        let customer = customers_list[z];
        if ( customer.id === id ) { return customer; }

    }

    return -1;

}

function edit_customer (id, new_name, new_budget) {

    for ( let  z = 0; z < customers_list.length; z++) {

        let customer = customers_list[z];

        if (customer.id === id) { customer.name = new_name;
                                  customer.budget = new_budget;
                                  return 1; }

    }

    return -1;

} 

function find_customers (search) {

    let result = [];
    search = search.toLowerCase();

    for (let customer of customers_list) {

        let attributes = [  customer.name,
                            customer.budget];

        for ( let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(customer);
                                                       break; 
            }
        }
    }

    return result;

}

function print_customers_list() {

    console.log("\n" + "Список усіх лікарень: ");

    for (let z = 0; z < customers_list.length; z++) {

        let customer = customers_list[z];
        console.log("\t" + "Імʼя замовника: " + customer.name);
        console.log("\t" + "Бюджет замовника: " + customer.budget);
        console.log("\t" + "ID: " + customer.id);

    }
}
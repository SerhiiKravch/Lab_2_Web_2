let last_performer_id = 0;
let performers_list = new Array();

class Performer {

    constructor (name, experience, count_workers, id) {

        this.name = name;
        this.experience = experience;
        this.count_workers = count_workers;
        this.id = id ;

        if (id === "" ||
        typeof id             === 'undefined') { this.id             = ++last_performer_id;     }
        if (name === "" ||
        typeof name           === 'undefined') { this.name           = "Невідомий виконавець"; }
        if (count_workers === "" ||
        typeof count_workers === 'undefined') { this.count_workers = "Не встановлено";       }
        if (experience === "" ||
        typeof experience     === 'undefined') { this.experience     = 0;                      }

    }
}

function add_performer (name, experience, count_workers, id) {

    let performer = new Performer(name, experience, count_workers,id);
    performers_list.push(performer);

    return performer;

}

function remove_performer (id) {

    for (let z = 0; z < performers_list.length; z++) {

        let performer = performers_list[z];
        if (performer.id === id) { performers_list.splice(z, 1);
                                   return 1; }

    }

    return -1;

}

function get_performers_list()
    { return performers_list; }

function set_performers_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_performer(element.name,
                      element.experience,
                      element.count_workers,
                      element.id);
    }
}

function get_performer_by_id (id) {

    for (let z = 0; z < performers_list.length; z++) {

        let performer = performers_list[z];
        if (performer.id === id ) { return performer; }

    }

    return -1;

}

function edit_performer (id, new_name, new_experience, new_count_workers) {

    for (let z = 0; z < performers_list.length; z++) {

        let performer = performers_list[z];

        if (performer.id === id ) { performer.name = new_name;
                                    performer.experience = new_experience;
                                    performer.count_workers = new_count_workers;
                                    return 1; }
    }

    return -1; 

}

function find_performers (search) {

    let result = [];
    search = search.toLowerCase();

    for (let performer of performers_list) {

        let attributes = [ performer.name,
            performer.experience,
            performer.count_workers];
        
        for(let attr of attributes) {
            
            if (attr.toLowerCase().includes(search)) { result.push(performer);
                                                        break;
            }
        } 
    }

    return result;

}

function print_customers_list() {

    console.log("\n" + "Список усіх виконавців:");

    for (let z = 0; z < performers_list.length; z++) {

        let performer = performers_list[z];
        console.log("\t" + "Назва виконавця: " + performer.name);
        console.log("\t" + "Досвід виконавця: " + performer.experience);
        console.log("\t" + "К-сть працівників виконавця: " + performer.count_workers);
        console.log("\t" + "ID: " + performer.id);
        
    }
}
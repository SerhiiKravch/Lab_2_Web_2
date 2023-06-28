class Performer{

    constructor(name, code, experience, count_workers){
        this.name= name;
        this.code= code;
        this.experience = experience;
        this.count_workers = count_workers;
        this.projects_in_progress_list = [];

        if (typeof name === 'undefined') { this.name = "Невідомий виконавець"; }
    }
    
}


let global_performers_list = new Array();

function add_Performer (name, code, experience, count_workers){

    let performer = new Performer(name, code, experience, count_workers);
    global_performers_list.push(performer);

    return performer;

}

function find_Performer (name, code, experience, count_workers){

    for (let performer of global_performers_list){

        if (name === performer.name && code === performer.code && experience === performer.experience && count_workers === performer.count_workers) { return performer; }

    }

    return -1;

}

function remove_Performer (name, code, experience, count_workers){

    for (let id = 0; id < global_performers_list.length; id++) {

        let performer = global_performers_list[id];

        if (performer.name === name && performer.code === code && performer.experience === experience &&  performer.count_workers === count_workers) { global_performers_list.splice(id, 1);
                                                                                            return 1;}
    }

    return -1;

}

function edit_Performer (name, code, experience, count_workers, new_name, new_code, new_experience, new_count_workers){

    for (let id = 0; id < global_performers_list.length; id++) {

        let performer = global_performers_list[id];

        if (performer.name === name && performer.code === code && performer.experience === experience &&  performer.count_workers === count_workers)

        {global_performers_list[id].name = new_name;
         global_performers_list[id].code = new_code;
         global_performers_list[id].experience = new_experience;
         global_performers_list[id].count_workers = new_count_workers;
         return 1;}

            return -1;
}
}

function get_Performers_list() {

    console.log("\n" + "Список всіх виконавців:");

    for (let id = 0; id < global_performers_list.length; id++) {

        let perf = global_performers_list[id];
        console.log(`Імʼя виконавця: ${perf.name} , код виконавця: ${perf.code}, досвід виконавця: ${perf.experience}б к-сть працівників виконавця: ${perf.count_workers}`);
    }

    console.log();
    
    return global_performers_list;
}


exports.find_Performer   = find_Performer;
exports.add_Performer    = add_Performer;
exports.edit_Performer   = edit_Performer;
exports.remove_Performer = remove_Performer;
exports.get_Performers_list  = get_Performers_list;
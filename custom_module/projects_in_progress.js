
class Project_in_progress{

    constructor(project, start_time, end_time)
    {
        this.project = project;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

function add_Project_in_progress(project, start_time, end_time, performer){
    
    let project_in_progress = new Project_in_progress(project, start_time, end_time);
    performer.projects_in_progress_list.push(project_in_progress);

    return project_in_progress;

}

function find_Project_in_progress(project, start_time, end_time, performer){

    for (let id = 0; id < performer.projects_in_progress_list.length; id++ )
    {

        let project_in_progress = performer.projects_in_progress_list[id];

        if (project === project_in_progress.project && start_time === project_in_progress.start_time && end_time == project_in_progress.end_time)
        {return project_in_progress; }
    }

    return -1;

}



function remove_Project_in_progress(project, start_time, end_time, performer){

    let project_in_progress = find_Project_in_progress(project, start_time, end_time, performer);

    if (project_in_progress === -1) {return -1; }

    let id = performer.projects_in_progress_list.indexOf(project_in_progress);
    performer.projects_in_progress_list.splice(id, 1);

    return 1;

}

function edit_Project_in_progress(project, start_time, end_time, performer, new_project, new_start_time, new_end_time){

    let project_in_progress = find_Project_in_progress(project, start_time, end_time, performer);

    if (project_in_progress == -1) { return -1; }

    let id = performer.projects_in_progress_list.indexOf(project_in_progress);

    performer.projects_in_progress_list[id].project = new_project;
    performer.projects_in_progress_list[id].start_time = new_start_time;
    performer.projects_in_progress_list[id].end_time = new_end_time;

    return 1;
}

function get_Project_in_progress(performer){

    console.log("\n" + `Список усіх проектів у виконанні виконавця ${performer.name}:`)

    for (let id = 0; id < performer.projects_in_progress_list.length; id++) {

        let proj = performer.projects_in_progress_list[id];
        console.log(`Проект: ${proj.project} , час початку виконання: ${proj.start_time}, час завершення виконання: ${proj.end_time}`);
    }

    console.log();

    return performer.projects_in_progress_list;

}

exports.find_Project_in_progress      = find_Project_in_progress;
exports.add_Project_in_progress       = add_Project_in_progress;
exports.remove_Project_in_progress    = remove_Project_in_progress;
exports.edit_Project_in_progress      = edit_Project_in_progress;
exports.get_Project_in_progress = get_Project_in_progress;

